const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const repo = "blackrexdl/next-restaurant";
const token = process.env.GITHUB_TOKEN;

async function updateTraffic() {
  const today = new Date().toISOString().split("T")[0];

  // Fetch repo traffic
  const res = await fetch(
    `https://api.github.com/repos/${repo}/traffic/views`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`,
      },
    },
  );

  const data = await res.json();
  const count = data.count || 0;

  // Read existing JSON
  let viewsData = [];
  if (fs.existsSync("views-data.json")) {
    viewsData = JSON.parse(fs.readFileSync("views-data.json"));
  }

  // Add today’s data
  viewsData.push({ date: today, views: count });

  // Keep last 30 days only
  if (viewsData.length > 30) viewsData = viewsData.slice(-30);

  fs.writeFileSync("views-data.json", JSON.stringify(viewsData, null, 2));
  console.log("Traffic updated:", today, count);
}

updateTraffic();
