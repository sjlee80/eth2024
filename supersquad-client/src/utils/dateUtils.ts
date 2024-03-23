export const calculateDateDiff = (startDate: string) => {
  const sDate = new Date(startDate);
  const cDate = new Date();

  const diffMSec = cDate.getTime() - sDate.getTime();
  const diffDate = diffMSec / (24 * 60 * 60 * 1000);

  return diffDate;
};
