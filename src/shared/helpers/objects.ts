export const a11yProps = (index: number, pageName: string) => ({
  id: `${pageName}-tab-${index}`,
  "aria-controls": `${pageName}-tabpanel-${index}`,
});
