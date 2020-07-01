'use strict';

const { Given, When, Then } = require('cucumber');
const seleniumWebdriver = require('selenium-webdriver');

const assert = require('assert')

const base_url = 'https://www.epam.com/careers'

Given('the EPAM Career site is opened', function () {
  return this.driver.get(base_url);
});

Then('the EPAM Career site should be opened', async function () {
  const titleToVerify = 'Explore Professional Growth Opportunities | EPAM Careers';
  const title = await this.driver.getTitle();
  assert.equal(title, titleToVerify);
});

Then('the search form should be visible', async function () {
  const isDisplayed = await this.driver.findElements(seleniumWebdriver.By.xpath("//form[contains(@class, 'job-search__form')]")).then(found => !!found.length);
  assert.ok(isDisplayed);
});

When('the location filter box is clicked', async function () {
  await this.driver.findElement(seleniumWebdriver.By.xpath("//div[@class='recruiting-search__location']//span")).click();
});

When('{string} in {string} is selected in the location filter box', function (city, country) {
  const until = seleniumWebdriver.until;
  const selection = this.driver.wait(until.elementLocated(seleniumWebdriver.By.xpath(`//ul[contains(@aria-activedescendant, ${country})]//span[contains(@aria-activedescendant, ${city})`)));
  selection.click();
});

Then('the location filter box should contain {string}', function (city) {
  const isDisplayed = this.driver.findElements(seleniumWebdriver.By.xpath(`//span[@class='select2-selection__rendered' and @title=${city}]`)).then(found => !!found.length);
  assert.ok(isDisplayed);
});

When('the skills filter box is clicked', async function () {
  await this.driver.findElement(seleniumWebdriver.By.xpath("//div[contains(@class, 'job-search__departments')]")).click();
});

When('{string} is selected in the skills filter box', function (skill) {
  const until = seleniumWebdriver.until;
  const selection = this.driver.wait(until.elementLocated(seleniumWebdriver.By.xpath(`//input[@data-value, ${skill})]`)));
  selection.click();
});

Then('the skills filter box should contain {string} and {string} count', function (text, count) {
  const isDisplayedText = this.driver.findElements(seleniumWebdriver.By.xpath(`//div[contains(@class, 'job-search__departments')]//span[@class='label' and contains(text(),${text})]`)).then(found => !!found.length);
  const isDisplayedCount = this.driver.findElements(seleniumWebdriver.By.xpath(`//div[contains(@class, 'job-search__departments')]//span[@class='counter' and contains(text(),${count})]`)).then(found => !!found.length);
  assert.ok(isDisplayedText && isDisplayedCount);
});

When('I type in the search engine {string}', async function (stringToSearch) {
  await this.driver.findElement(seleniumWebdriver.By.name('q')).sendKeys(stringToSearch);
});

When('the FIND button is clicked', async function () {
  await this.driver.findElement(seleniumWebdriver.By.xpath("//button[@class='recruiting-search__submit']")).click();
})

Then('the search result section should be displayed', function () {
  const isDisplayedResultsSection = this.driver.findElements(seleniumWebdriver.By.xpath("//section[(@class='search-result']")).then(found => !!found.length);
  assert.ok(isDisplayedResultsSection);
});
