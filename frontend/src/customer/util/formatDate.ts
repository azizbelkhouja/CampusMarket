export function formatDate(date:any) {

    date = new Date(date);
    const options = {
      weekday: 'short',
      month: 'short' ,
      day: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  }