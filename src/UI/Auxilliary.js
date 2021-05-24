import PropTypes from 'prop-types'

const Auxilliary = ({ className, ...props }) => {
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

Auxilliary.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.oneOfType(
    [
      PropTypes.element,
      PropTypes.bool
    ]
  )).isRequired
}

export default Auxilliary
