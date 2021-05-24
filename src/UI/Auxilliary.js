import PropTypes from 'prop-types'

const Auxilliary = ({ className, ...props }) => {
  return (
    <div className={className} data-testid='aux-parent-div'>
      {props.children}
    </div>
  )
}

Auxilliary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType(
    [
      PropTypes.element,
      PropTypes.bool
    ]
  )).isRequired,
  className: PropTypes.string.isRequired
}

export default Auxilliary
