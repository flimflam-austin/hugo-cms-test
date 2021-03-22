const fs = require("fs-extra");

const directories = [
  //`${__dirname}/../site/content/quick_quotes/`,
  //`${__dirname}/../site/content/quick_reads/`,
  `${__dirname}/../site/content/video_posts/`,
];

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

    console.log(cleanedShortcodes);

    fs.writeFileSync(filePath, cleanedShortcodes);

    /* console.log(data);
    const getShortcodeContent = data.replace(/\\/g, '"'); */

    /* console.log(getShortcodeContent); */
  });
});
