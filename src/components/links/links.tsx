import fs from 'fs';
import path from 'path';

type LinkItem = {
  title: string;
  url: string;
};

export default function LinkList() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'links.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const links: LinkItem[] = JSON.parse(fileContents);

  return (
    <ul className="ml-6 space-y-4">
      {links.map((link, index) => (
        <li key={index} className="text-lg">
          <span className="font-semibold mr-2">{index + 1}.</span>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
