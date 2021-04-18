const fs = require('fs-extra');
const inspect = require('./inspect')

const directories = [
    `${__dirname}/../../site/content/quick_quotes/`,
    `${__dirname}/../../site/content/quick_reads/`,
    `${__dirname}/../../site/content/video_posts/`
];

const scrubShortcodes = () => {
    inspect.bland('Converting shortcodes.....');

    directories.forEach(root => {
        fs.readdirSync(root).forEach(subdir => {
            if (subdir === '.DS_Store') {
                return null;
            }

            const filePath = `${root}${subdir}/index.md`;

            inspect.bland(filePath);

            const info = fs.readFileSync(filePath, 'utf8');

            if (!info) {
                inspect.errorRed(Error(`Failed to read: ${filePath}`));
                return null;
            }

            const cleanedShortcodes = info.replace(/(?<={{<).*?(?=>}})/g, match => match.replace(/\\/g, '"'));

            const cleanedTitle = cleanedShortcodes.replace('title=" ', '');

            fs.writeFileSync(filePath, cleanedTitle);

            return filePath
        });
    });

    inspect.bland('Shortcode conversion complete.....');
};

exports.scrubShortcodes = scrubShortcodes;
