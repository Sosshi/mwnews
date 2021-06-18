let dateNow: Date;
let publishedDate: Date;

const DAY_IN_MINUTES = 1440;

const convertMinutesToHours = (minutes: number) => {
    return Math.floor(minutes / 60);
};

function convertToDate(date: string | Date): string {
    dateNow = new Date();
    publishedDate = new Date(date);

    const DateNowMilliseconds: number = dateNow.getTime();
    const publishedDateMilliseconds: number = publishedDate.getTime();

    const compareMinutes =
        (DateNowMilliseconds - publishedDateMilliseconds) / (1000 * 60);

    if (compareMinutes < 1) {
        return "Just now";
    } else if (compareMinutes == 1) {
        return "A minute ago";
    } else if (compareMinutes < 60) {
        return `${Math.floor(compareMinutes)} minutes ago`;
    } else if (compareMinutes < 120) {
        return (
            convertMinutesToHours(compareMinutes) + " hour ago"
        );
    } else if (
        compareMinutes < DAY_IN_MINUTES &&
        compareMinutes >= 60
    ) {
        return (
            convertMinutesToHours(compareMinutes) + " hours ago"
        );
    } else if (
        compareMinutes >= DAY_IN_MINUTES &&
        compareMinutes < DAY_IN_MINUTES * 2
    ) {
        return "Yesterday";
    } else if (
        compareMinutes >= DAY_IN_MINUTES * 2 &&
        compareMinutes < DAY_IN_MINUTES * 3
    ) {
        return "2 days ago";
    }

    return (
        String(publishedDate.getFullYear()) +
        "/" +
        String(publishedDate.getMonth() + 1) +
        "/" +
        String(publishedDate.getDay() + 1)
    );
}

export default convertToDate