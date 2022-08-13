import { DateTime } from "luxon";

export const getTimeAgo = (isoDate) => {
  const oldTime = DateTime.fromISO(isoDate);
  const currentTime = DateTime.fromJSDate(new Date());

  const diff = currentTime.diff(oldTime, [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
  ]);

  let timeAgo = "";
  // get the first non-zero time
  for (const [key, value] of Object.entries(diff.values)) {
    const roundedValue = Math.floor(value);

    if (roundedValue > 1) {
      timeAgo = `${roundedValue} ${key} ago`;
      break;
    } else if (roundedValue === 1) {
      timeAgo = `${roundedValue} ${key.slice(0, -1)} ago`;
      break;
    } else {
      timeAgo = "a few moments ago";
    }
  }

  return timeAgo;
};

export const publishBlog = (blog) => {
  blog.published = !blog.published;

  fetch(`http://localhost:9000/blogs/blog/${blog._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });
};
