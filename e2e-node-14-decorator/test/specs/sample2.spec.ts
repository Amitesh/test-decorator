import { suite, test, context, skip } from '@testdeck/mocha';
import { Severity, issue, testCaseId, severity, 
  feature, story, getReporter, Status } from '../../utils/allure-report-decorators';


@suite
class MySuite {
  //   public static testData = (): User[] => {
  //     return [User.dummy(), User.dummy1()]
  //   }

  @issue('11')
  @testCaseId('10')
  @severity(Severity.BLOCKER)
  // @epic('User Authentication')
  @feature('Login')
  @story('Common authorization support')
  // @owner('skorol')
  // @tag('smoke')
  // @description('Basic authorization test.')

  // @data(MySuite.testData)
  // @data.naming(user => `${user} should be able to sign`)
  @test
  public MyTest1() {
    getReporter().addStep('Step: running test- MyTest1');
    getReporter().startStep('start of step');
    getReporter().addStep('step body');
    getReporter().endStep('passed');
    console.log('=== in my test ')
    expect(5).toBeGreaterThan(4);
  }

  @skip
  @test
  public MyTest3() {
    console.log('=== in my test ');
    // this[context].skip();
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
  it('should login with valid credentials', function () {
    this.skip()
    console.log('=== in describe ===');
    expect(5).toBeGreaterThan(2);
  })
})

describe('My Login application 2', () => {
  it('should login with valid credentials 2', () => {
    console.log('=== in describe ===');
    expect(5).toBeGreaterThan(2);
  })
})