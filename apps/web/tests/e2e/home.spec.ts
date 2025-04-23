import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check the page title
  await expect(page).toHaveTitle('Block Kit Web Example');
  
  // Check that the main heading is visible
  const heading = page.getByRole('heading', { name: 'Block Kit Web Example' });
  await expect(heading).toBeVisible();
  
  // Check that all buttons are visible
  const defaultButton = page.getByRole('button', { name: 'Default Button' });
  const secondaryButton = page.getByRole('button', { name: 'Secondary Button' });
  const outlineButton = page.getByRole('button', { name: 'Outline Button' });
  const destructiveButton = page.getByRole('button', { name: 'Destructive Button' });
  
  await expect(defaultButton).toBeVisible();
  await expect(secondaryButton).toBeVisible();
  await expect(outlineButton).toBeVisible();
  await expect(destructiveButton).toBeVisible();
}); 