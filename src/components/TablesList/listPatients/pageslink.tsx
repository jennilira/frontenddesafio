interface PaginationLink {
  label: string;
  active: boolean;
  onClick: () => void;
}

interface PaginationProps {
  links: PaginationLink[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
  return (
    <ul className="pagination">
      {links.map((link, index) => (
        <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
          <button className="page-link" onClick={link.onClick}>{link.label}</button>
        </li>
      ))}
    </ul>
  );
  
};

//essa pagina seria onde pageva os links para paginar