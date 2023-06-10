import { Dispatch } from "react";

interface PaginationLink {
  label: string;
  active: boolean;
  onClick: () => void;
  link: number;
}

interface PaginationProps {
  links: PaginationLink[];
  currentPage: number;
  setCurrentPage: Dispatch<(page: number) => number>;
}

const Pagination: React.FC<PaginationProps> = ({
  links,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <ul className="pagination">
      {links.map((link, index) => (
        <li key={index} className={`page-item ${link.active ? "active" : ""}`}>
          <button
            className="page-link"
            onClick={() => {
              console.log(link.label);
              if (link.label === "Próximo &raquo;") {
                link.label = "Próximo >";

                if (currentPage === links.length - 2) {
                  setCurrentPage((page: number) => 1);
                } else {
                  setCurrentPage((page: number) => page + 1);
                }
              } else if (link.label === "&laquo; Anterior") {
                link.label = "< Anterior";

                if (currentPage <= 1) {
                  setCurrentPage((page: number) => 1);
                } else {
                  setCurrentPage((page: number) => page - 1);
                }
              } else {
                setCurrentPage((page: number) => Number(link.label));
              }
            }}
          >
            {link.label === "Próximo &raquo;"
              ? "Próximo >"
              : link.label === "&laquo; Anterior"
              ? "< Anterior"
              : link.label}
            {/* {link.label === '&laquo; Anterior' ? 'Anterior' : link.label} */}
            {/* {link.label === '&raquo; Próximo' ? 'Próximo' : link.label} */}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
//essa pagina seria onde pageva os links para paginar
