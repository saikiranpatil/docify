export const getFormattedDateTime = (date) => {
    const inputDate = new Date(date);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDate = inputDate.toLocaleDateString("en-US", dateOptions);
    const formattedTime = inputDate.toLocaleDateString("en-US", timeOptions);

    return formattedDate + " " + formattedTime.split(", ")[1];
}