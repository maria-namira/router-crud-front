import PropTypes from 'prop-types';
import { useEffect } from 'react'
import './Error.scss'

export default function Error({ error, errorHandler }) {

  useEffect(() => {
    const timerID = setTimeout(() => errorHandler(null), 5 * 1000);

    return () => clearTimeout(timerID);
  }, [])

  return (
    <div className="error">
      <span>{error}</span>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.string,
  errorHandler: PropTypes.func.isRequired
}