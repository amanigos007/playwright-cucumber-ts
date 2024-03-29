Feature: User Authentication

  Background:
    Given user navigates to application
    And user click on the login link

  Scenario: Login should be success
    When user enter the username as "standard_user"
    And user enter the password "secret_sauce"
    And user click on the login button
    Then login should be successful

  Scenario: Login should be unsuccessful
    When user enter the username as "invalid_username"
    And user enter the password "invalid_password"
    And user click on the login button
    Then login should be unsuccessful