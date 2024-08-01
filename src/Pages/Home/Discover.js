import React, { memo, useCallback, useEffect, useState } from "react";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import DropdownItem from "reactstrap/lib/DropdownItem";
import UncontrolledDropdown from "reactstrap/lib/UncontrolledDropdown";
import DropdownToggle from "reactstrap/lib/DropdownToggle";
import DropdownMenu from "reactstrap/lib/DropdownMenu";
import { Link } from "react-router-dom";
import "./home-screen.scss";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import ImageCard from "../../Components/ImageCard";
import Post from "../../models/postModel";
import { category } from "../../models/CategoryModel";
import { navigationItems } from "../../Utilities/constants";
import { useDispatch } from "react-redux";
import SiteLoader from "../../Components/SiteLoader";
import { setHomePostData } from "../../store/reducers/homeSlice";

const Discover = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ label: "Trending" });
  const [navItems, setNavItems] = useState([]);

  const {
    auth: { loginUser },
    home: { homePostData },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    filterPosts();
  }, [filter]);

  useEffect(() => {
    getFilterCategories();
  }, []);

  const getFilterCategories = useCallback(async () => {
    const response = await category.list();
    const categoryNavItems =
      !isEmpty(response) &&
      response.map((label) => ({
        label: label.name,
        categoryId: label.id,
      }));
    setNavItems([...navigationItems, ...categoryNavItems]);
  }, []);

  const filterPosts = async () => {
    setLoading(true);
    try {
      let postItems = [];
      const label = filter.label;

      switch (label) {
        case "Trending": {
          const { items } = await Post.listTrendingPost("", loginUser?.id);
          console.log("post", items);
          postItems = items;
          break;
        }
        case "mostPopular": {
          const { items } = await Post.listByLikes({}, loginUser?.id);
          postItems = items;
          break;
        }
        case "newest": {
          const { items } = await Post.list({}, loginUser?.id);
          postItems = items;
          break;
        }
        default: {
          const { items } = await Post.listByLikes(
            {
              postCategoryId: { eq: filter.categoryId },
            },
            loginUser?.id
          );
          postItems = items;
          break;
        }
      }
      dispatch(setHomePostData(postItems));
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFilter = (category) => setFilter(category);

  return (
    <React.Fragment>
      <section className={isEmpty(loginUser) ? "mt-4" : "section"}>
        <Container>
          <Col>
            {isEmpty(loginUser) && (
              <div className="text-center mb-2">
                <h2 className="mb-3 fw-semibold lh-base">Explore Benefits</h2>
              </div>
            )}
          </Col>
          <Col className="d-flex">
            <div className="mt-1 px-2" id="filterBtn">
              <ButtonGroup>
                <UncontrolledDropdown>
                  <DropdownToggle
                    tag="button"
                    className="btn btn-light sort-dropdown d-flex"
                  >
                    <i className="fs-20 ri-filter-3-line"></i>
                    Filters <i className="mdi mdi-chevron-down"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdownmenu-primary">
                    <DropdownItem
                      onClick={() => handleFilter({ label: "newest" })}
                    >
                      Newest
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleFilter({ label: "mostPopular" })}
                    >
                      {" "}
                      Most popular
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </ButtonGroup>
            </div>
            <div className="text-center" id="sortByFilter">
              <ul
                className="list-inline categories-filter animation-nav"
                id="filter"
              >
                {navItems.map((category) => (
                  <li className="list-inline-item">
                    <Link
                      onClick={() => handleFilter(category)}
                      to="#"
                      className={
                        category.label === filter.label ? "active" : ""
                      }
                      data-filter="*"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          {loading && <SiteLoader />}
          <Row>
            {!isEmpty(homePostData) &&
              homePostData.map((item, key) => (
                <ImageCard
                  postInfo={item}
                  isOwner={
                    isEmpty(loginUser)
                      ? false
                      : item.postedBy?.id === loginUser.id
                  }
                  isHomePage={true}
                />
              ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default memo(Discover);
