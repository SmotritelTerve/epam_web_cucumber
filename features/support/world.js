const { setWorldConstructor } = require('cucumber');
const webdriver = require('selenium-webdriver');
const Capabilities = require('selenium-webdriver/lib/capabilities')
        .Capabilities;
const capabilities = Capabilities.chrome();

function World({ attach, parameters }) {
    this.driver = new webdriver.Builder()
    .withCapabilities(capabilities).build();
}

setWorldConstructor(World);
