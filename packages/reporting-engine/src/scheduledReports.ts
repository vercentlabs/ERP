export type ScheduledReport = {
  reportId: string;
  cron: string;
  recipients: string[];
};

export function nextScheduledReportJob(report: ScheduledReport) {
  return {
    name: `report.${report.reportId}`,
    cron: report.cron,
    payload: { recipients: report.recipients },
  };
}
