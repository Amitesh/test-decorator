/**
 * This code was partially cloned from testdeck/core package and improved to support missing features.
 */
import { default as AllureReporter, Status } from '@wdio/allure-reporter';
const nodeSymbol: (key: string) => string = (key): string => '__testdeck_' + key
const testNameSymbol: string = nodeSymbol('name')
const parametersSymbol: string = nodeSymbol('parametersSymbol')
const nameForParametersSymbol: string = nodeSymbol('nameForParameters')

type Params = object | Function
type Execution = undefined | 'pending' | 'only' | 'skip' | 'execution'
type TestDecorator = (target: object, property: string, descriptor: PropertyDescriptor) => PropertyDescriptor
type ParamsDecorator = (params: Params, name?: string) => TestDecorator

interface ParameterizedPropertyDescriptor extends PropertyDescriptor {
  (params: Params, name?: string): MethodDecorator

  skip(params: Params, name?: string): MethodDecorator

  only(params: Params, name?: string): MethodDecorator

  pending(params: Params, name?: string): MethodDecorator

  naming(nameForParameters: (params: Params) => string): MethodDecorator
}

interface IAllureReporter {
  startStep(arg0: string): void;
  step(arg0: string): void;
  endStep(arg0: Status): void;
  addStep: (title: string) => void
  addFeature: (featureName: string) => void
  addEnvironment: (name: string, value: string) => void
  addArgument: (name: string, value: string) => void
  addDescription: (description: string, type: string) => void
  addAttachment: (name: string, content: string, type?: string) => void
  addStory: (storyName: string) => void
  addSeverity: (severity: string) => void
  addIssue: (issue: string) => void
  addTestId: (testId: string) => void
}

export {Status} from '@wdio/allure-reporter';
export enum Severity {
  BLOCKER = 'blocker',
  CRITICAL = 'critical',
  NORMAL = 'normal',
  MINOR = 'minor',
  TRIVIAL = 'trivial',
}

export const data: ParameterizedPropertyDescriptor = makeParamsObject()

export function step<T>(nameFn: string | ((arg: T) => string)): TestDecorator {
  return processDecorator(nameFn, (title) => getReporter().addStep(title))
}

export function testCaseId<T>(idFn: string | ((arg: T) => string)): TestDecorator {
  console.log("$$testcaseID");
  return processDecorator(idFn, (id) => getReporter().addTestId(id))
}

export function issue<T>(idFn: string | ((arg: T) => string)): TestDecorator {
  return processDecorator(idFn, (id) => getReporter().addIssue(id))
}

export function feature<T>(featureFn: string | ((arg: T) => string)): TestDecorator {
  return processDecorator(featureFn, (name) => getReporter().addFeature(name))
}

export function story<T>(storyFn: string | ((arg: T) => string)): TestDecorator {
  return processDecorator(storyFn, (name) => getReporter().addStory(name))
}

export function severity<T>(severityFn: Severity | string | ((arg: T) => string | Severity)): TestDecorator {
  return processDecorator(severityFn, (name) => getReporter().addSeverity(name))
}

export function getReporter(): IAllureReporter {
  // @ts-ignore
  const reporter: IAllureReporter = AllureReporter//global.reporter
  if (!reporter) {
    throw new Error('Unable to find AllureReporter in a global context')
  }
  return reporter
}

function processDescriptor<T>(
  parameterFn: string | ((arg: T) => string),
  reporterFn: (arg: string) => void,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original: object = descriptor.value
  if (typeof original === 'function') {
    descriptor.value = function (...args: [object]) {
      try {
        const value: string = typeof parameterFn === 'function' ? parameterFn.apply(this, args) : parameterFn
        reporterFn(value)
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(`[ERROR] Failed to apply decorator: ${e}`)
      }
      return original.apply(this, args)
    }
  }

  for (const prop of Object.keys(original)) {
    if (original.hasOwnProperty(prop) && prop.startsWith('__testdeck_')) {
      descriptor.value[prop] = original[prop]
    }
  }

  return descriptor
}

function makeParamsFunction<T>(execution?: Execution): ParamsDecorator {
  return (params: Params, name?: string) => {
    return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
      const adjustedParams = typeof params === 'function' ? params() : params
      target[propertyKey][testNameSymbol] = propertyKey.toString()
      target[propertyKey][parametersSymbol] = target[propertyKey][parametersSymbol] || []
      ;[].concat(adjustedParams || []).forEach((param) => {
        target[propertyKey][parametersSymbol].push({ execution, name, params: param })
      })
      return processDescriptor<T>(
        (args) => JSON.stringify(args),
        (arg) => getReporter().addArgument('inputs', arg),
        descriptor
      )
    }
  }
}

function makeParamsNameFunction(): ParamsDecorator {
  return (nameForParameters: (params: Params) => string) => {
    return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
      target[propertyKey][nameForParametersSymbol] = nameForParameters
      return descriptor
    }
  }
}

function makeParamsObject(): ParameterizedPropertyDescriptor {
  return Object.assign(makeParamsFunction(), {
    only: makeParamsFunction('only'),
    pending: makeParamsFunction('pending'),
    skip: makeParamsFunction('skip'),
    naming: makeParamsNameFunction(),
  })
}

function processDecorator<T>(parameterFn: string | ((arg: T) => string), reporterFn: (arg: string) => void): TestDecorator {
  return (target: object, property: string, descriptor: PropertyDescriptor) => {
    return processDescriptor(parameterFn, reporterFn, descriptor)
  }
}
  

export function myissue(value: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const original = descriptor.value;

      console.log('== 1 ==', typeof original);
      if (typeof original === 'function') {
          descriptor.value = function(...args) {
              try {
                console.log('== 2 ==');
                AllureReporter.addIssue(value);
              } catch (e) {
                  console.error(`[ERROR] Failed to decorate ${target.constructor.name}.${propertyKey}: ${e}`);
              }

              console.log('=== this ===', this);
              console.log('=== target ===', target);
              console.log('=== target.constructor ===', target.constructor);
              console.log('=== target.constructor.name ===', target.constructor.name);
              console.log('=== propertyKey ===', propertyKey);
              console.log('=== original ===', original);

              console.log('=== title1 ===', this[context]._runnable?.title);
              // this[context]._runnable.title += '- new title';
              // console.log('=== title11 ===', this[context]._runnable?.title);
              console.log('=== title2 ===', this[context].test?.title);
              console.log('=== title3 ===', this[context].ctx?.title);
              // console.log('=== title4 ===', this[context]);
              // console.log('=== skip ===', this[context].skip());

              const tagToSkip = '#my-tag'; // get it from an service
              console.log('=== tagToSkip =>', tagToSkip);

              if(tagToSkip === value){
                this[context].skip();
              }
              console.log('== 3 ==');
              return original.apply(this, args);
          };

          for (let prop of Object.keys(original)) {
            console.log('== 4 ==', prop);
              if(original.hasOwnProperty(prop) && prop.startsWith('__testdeck_')) {
                console.log('== 5 ==', prop);
                  descriptor.value[prop] = original[prop]
              }
          }
      }
      return descriptor;
  };
}
