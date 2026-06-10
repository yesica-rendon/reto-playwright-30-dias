import { test, expect } from '@playwright/test'

//page = fixture
test('login sauce demo', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveTitle(/Swag Labs/);

});

test('login with locked user', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', {name: 'Username'}).fill('locked_out_user');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByRole('heading', {name: 'Epic sadface: Sorry, this user has been locked out.'})).toBeVisible();

});

test('login with invalid credentials', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', {name: 'Username'}).fill('user');
    await page.getByRole('textbox', {name: 'Password'}).fill('sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByRole('heading', {name: 'Epic sadface: Username and password do not match any user in this service'})).toBeVisible();

});

test('login without user', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByRole('heading', {name: 'Epic sadface: Username is required'})).toBeVisible();

});

test('login without password', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByRole('heading', {name: 'Epic sadface: Password is required'})).toBeVisible();

});