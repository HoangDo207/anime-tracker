import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faThumbsUp,
  faThumbsDown,
  faHeart,
  faStar,
  faBookmark,
  faSquare,
} from "@fortawesome/free-regular-svg-icons";

import {
  faMagnifyingGlass,
  faFilter,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faThumbsUp,
  faThumbsDown,
  faHeart,
  faStar,
  faBookmark,
  faMagnifyingGlass,
  faFilter,
  faCheck,
  faSquare
);

export default FontAwesomeIcon;
