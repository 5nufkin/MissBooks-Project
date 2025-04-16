import { RatingBySelect } from "./dynamicCmps/RatingBySelect.jsx"
import { RatingByText } from "./dynamicCmps/RatingByText.jsx"
import { RatingByStars } from "./dynamicCmps/RatingByStars.jsx"

export function DynamicCmp(props) {
  const dynamicCmpMap = {
    select: <RatingBySelect {...props} />,
    text: <RatingByText {...props} />,
    stars: <RatingByStars {...props} />,
  }
  return dynamicCmpMap[props.cmpType]
}