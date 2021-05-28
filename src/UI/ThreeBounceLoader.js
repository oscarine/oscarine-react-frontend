const ThreeBounceLoader = () => {
  const circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full'

  return (
    <div className='flex justify-center'>
      <div className={`${circleCommonClasses} mr-1 animate-bounce`} />
      <div className={`${circleCommonClasses} mr-1 animate-bounce-200`} />
      <div className={`${circleCommonClasses} animate-bounce-400`} />
    </div>
  )
}

export default ThreeBounceLoader
