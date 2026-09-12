export function formatDate(dateString) {
  return new Date(dateString).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function groupByDay(activities) {
  return activities.reduce((groups, activity) => {
    const day = new Date(activity.createdAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    groups[day] = groups[day] || [];
    groups[day].push(activity);
    return groups;
  }, {});
}