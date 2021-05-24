import { useField } from 'formik'
import PropTypes from 'prop-types'
import Auxilliary from '../Auxilliary'

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <Auxilliary className='flex flex-col pb-3'>
      <label
        htmlFor={props.id || props.name}
        className='text-m font-semibold text-black pb-2'
      >
        {label}
      </label>
      <input
        id={props.id || props.name}
        className='pl-2 pr-2 h-8 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent ...'
        {...field} {...props}
      />
      {meta.touched && meta.error &&
        <div className='pt-1'>
          <p data-testid={'error-' + props.name} className='text-red-600'>{meta.error}</p>
        </div>}
    </Auxilliary>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  id: PropTypes.string
}

export default TextInput
