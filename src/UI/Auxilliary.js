const Auxilliary = ({ className, ...props }) => {
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default Auxilliary
