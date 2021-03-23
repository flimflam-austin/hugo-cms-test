const fs = require("fs-extra");

const directories = [
  `${__dirname}/../../site/content/quick_quotes/`,
  `${__dirname}/../../site/content/quick_reads/`,
  `${__dirname}/../../site/content/video_posts/`,
];

const scrubShortcodes = () => {
  console.log("Converting shortcodes.....");

  directories.forEach((root) => {
    fs.readdirSync(root).map((subdir) => {
      if (subdir === ".DS_Store") {
        return;
      }

      const filePath = `${root}${subdir}/index.md`;
      console.log(filePath);

      const info = fs.readFileSync(filePath, "utf8");

      if (!info) {
        console.log(`Failed to read: ${filePath}`);
        return;
      }

      const cleanedShortcodes = info.replace(/(?<={{<).*?(?=>}})/g, (match) => {
        return match.replace(/\\/g, '"');
      });

      const cleanedTitle = cleanedShortcodes.replace('title=" ', "");

      fs.writeFileSync(filePath, cleanedTitle);
    });
  });

  console.log("Shortcode conversion complete.....");
};

scrubShortcodes();

exports.scrubShortcodes = scrubShortcodes;
