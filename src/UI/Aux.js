const Aux = ({ className, ...props }) => {
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default Aux
