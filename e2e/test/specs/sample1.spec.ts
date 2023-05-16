import { suite, test } from '@testdeck/mocha'
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
import { allure, MochaAllure } from 'allure-mocha/runtime';


@suite
class MySuite {
//   public static testData = (): User[] => {
//     return [User.dummy(), User.dummy1()]
//   }

  @issue('11')
  @testCaseId('10')
  @severity(Severity.BLOCKER)
  @epic('User Authentication')
  @feature('Login')
  @story('Common authorization support')
  @owner('skorol')
  @tag('smoke')
  @description('Basic authorization test.')
//   @data(MySuite.testData)
//   @data.naming(user => `${user} should be able to sign`)
  @test
  public MyTest() {
    console.log('=== in my test ')
    expect(5).toBeGreaterThan(2);
  }

  public before() {
    decorate<MochaAllure>(allure)
    console.log(' === in before')
  }

  public after() {
    allure.attachment('Test attachment', 'test attachment content', ContentType.TEXT)
    console.log(' === in after')
  }
}