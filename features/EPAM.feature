Feature: EPAM site
As a webinar attendee
I want to write test for EPAM career site
So that I can practice Cucumber

Scenario: Search for a job
  Given the EPAM Career site is opened
    Then the EPAM Career site should be opened
      And the search form should be visible

  When the location filter box is clicked
      And "Saint-Petersburg" in "Russian Federation" is selected in the location filter box
    Then the location filter box should contain "Saint-Petersburg"

  When the skills filter box is clicked
      And "Software Test Engineering" is selected in the skills filter box
    Then the skills filter box should contain "Selected:" and "1" count

  When the FIND button is clicked
   Then the search result section should be displayed
