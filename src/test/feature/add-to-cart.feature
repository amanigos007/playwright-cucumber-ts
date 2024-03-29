Feature: Add to cart

  Background:
    Given user navigates to application
    When user enter the username as "standard_user"
    And user enter the password "secret_sauce"
    And user click on the login button

  Scenario Outline: Add product to the cart
    And user add "<products>" to the cart
    And user navigates to cart page
    Then user should see "<products>" to the cart page
    Examples:
      | products                 |
      | Sauce Labs Fleece Jacket |
      | Sauce Labs Bike Light    |
      | Sauce Labs Onesie        |