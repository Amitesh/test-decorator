import { suite, test, context } from '@testdeck/mocha'
import {
  assignPmsUrl,
  assignTmsUrl,
  data,
  decorate,
  description,
  epic,
  feature,
  issue,
  owner,
  severity,
  story,
  tag,
  testCaseId
} from 'allure-decorators';
import { ContentType, Severity } from 'allure-js-commons';
// import { allure, MochaAllure } from 'allure-mocha/runtime';

import { default as AllureReporter } from '@wdio/allure-reporter';

// interface IAllureReporter {
//   addStep: (title: string) => void
//   addFeature: (featureName: string) => void
//   addEnvironment: (name: string, value: string) => void
//   addArgument: (name: string, value: string) => void
//   addDescription: (description: string, type: string) => void
//   addAttachment: (name: string, content: string, type?: string) => void
//   addStory: (storyName: string) => void
//   addSeverity: (severity: string) => void
//   addIssue: (issue: string) => void
//   addTestId: (testId: string) => void
// }

// function getReporter(): IAllureReporter {
//   const reporter : IAllureReporter = AllureReporter//global.reporter

//   if (!reporter) {
//     throw new Error('Unable to find the AllureReporter in a global context');
//   }
//   return reporter;
// }


@suite
class MySuite {
  //   public static testData = (): User[] => {
  //     return [User.dummy(), User.dummy1()]
  //   }

  // @issue('11')
  // @testCaseId('10')
  // @severity(Severity.BLOCKER)
  // @epic('User Authentication')
  // @feature('Login')
  // @story('Common authorization support')
  // @owner('skorol')
  // @tag('smoke')
  // @description('Basic authorization test.')

  // @data(MySuite.testData)
  // @data.naming(user => `${user} should be able to sign`)
  @test
  public MyTest1() {
    this[context].skip();
    console.log('=== in my test ')
    expect(5).toBeGreaterThan(4);
  }

  @test
  public MyTest3() {
    console.log('=== in my test ')
    expect(5).toBeGreaterThan(2);
  }

  public before() {
    // decorate<MochaAllure>(allure)
    console.log(' === in before');
  }

  public after() {
    // getReporter().addAttachment('Test attachment', 'test attachment content', ContentType.TEXT)
    console.log(' === in after')
  }
}

describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    console.log('=== in describe ===');
    expect(5).toBeGreaterThan(2);
  })
})