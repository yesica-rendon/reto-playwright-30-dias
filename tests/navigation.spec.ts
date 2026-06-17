import { test, expect } from '@playwright/test'

test('Check left menu options', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    const leftMenuItems = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('listitem');
    const currentMenuItemsCount = await leftMenuItems.count();
    console.log('Current menu items count', currentMenuItemsCount);

    const currentMenuItems: string[] = [];

    for (let i = 0; i < currentMenuItemsCount; i++) {

        const menuText = await leftMenuItems.nth(i).innerText();
        currentMenuItems.push(menuText);
    }


    console.log(currentMenuItems);

    const expectMenuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ];

    expect(currentMenuItems).toEqual(expectMenuItems);

    expect(currentMenuItems[0]).toEqual(expectMenuItems[0]); //Valida que 1ra posición de currentMenuItems sea igual a 1ra posición de expectMenuItems

});

test('Navigate through the left panel', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    const leftMenuItems = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('listitem');
    const currentMenuItemsCount = await leftMenuItems.count();


    for (let i = 0; i < currentMenuItemsCount; i++) {

        const menuItem = leftMenuItems.nth(i);
        const menuText = await menuItem.innerText();

        console.log('Current menu item', menuText);

        if (menuText !== 'Maintenance') {

            await menuItem.click();

        } else {

            await menuItem.click();
            await page.goBack();

        }

    }
});

test('Check all the qualification links', async ({ page }) => {

    const expectPages = [
        {
            menu: 'Skills',
            url: '/web/index.php/admin/viewSkills'
        },
        {
            menu: 'Education',
            url: '/web/index.php/admin/viewEducation'
        },
        {
            menu: 'Licenses',
            url: '/web/index.php/admin/viewLicenses'
        },
        {
            menu: 'Languages',
            url: '/web/index.php/admin/viewLanguages'
        },
        {
            menu: 'Memberships',
            url: '/web/index.php/admin/membership'
        }
    ];

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click();
     
    const qualificationOptions = page.getByRole('menu').locator('li');

    for(let expectPage of expectPages) {

        const menuOption = qualificationOptions.filter({hasText: expectPage.menu});
        await menuOption.click();
        await expect(page).toHaveURL(new RegExp(expectPage.url));

        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click();
    }


});


test('Check all the job links', async ({ page }) => {

    const expectPages = [
        {
            menu: 'Job Titles',
            url: '/web/index.php/admin/viewJobTitleList'
        },
        {
            menu: 'Pay Grades',
            url: '/web/index.php/admin/viewPayGrades'
        },
        {
            menu: 'Employment Status',
            url: '/web/index.php/admin/employmentStatus'
        },
        {
            menu: 'Job Categories',
            url: '/web/index.php/admin/jobCategory'
        },
        {
            menu: 'Work Shifts',
            url: '/web/index.php/admin/workShift'
        }
    ];

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Job').click();
    
    const jobOptions = page.getByRole('menu').locator('li');

    for(let expectPage of expectPages) {

        const menuOption = jobOptions.filter({hasText: expectPage.menu});
        await menuOption.click();
        await expect(page).toHaveURL(new RegExp(expectPage.url));

        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Job').click();
    }


});