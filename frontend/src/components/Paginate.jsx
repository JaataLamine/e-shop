import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

/**
 * This component render a pagination.
 * @component
 * @param {Object} props - The component props
 * @param {integer} props.pages - The total pages
 * @param {integer} props.page - The current page
 * @param {Boolean} props.isAdmin - The user is an admin
 * @returns {React.ReactElement} A pagination
 */
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;
