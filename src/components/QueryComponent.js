import React from "react"
import PropTypes from "prop-types"
import withLocation from "../components/Location"

const CustomQueryStringComponent = ({ search }) => {
  const { custom } = search
  return <p>Custom Value: {custom}</p>
}

CustomQueryStringComponent.propTypes = {
  search: PropTypes.object,
}

export default withLocation(CustomQueryStringComponent)