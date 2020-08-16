import { useState, useCallback } from 'react'


const useApi = (api) => {
  const [error, setError] = useState(null)
  const unsetError = useCallback(() => setError(false), [setError])

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(undefined)

  const request = useCallback(async (...params) => {
    setLoading(true)

    try {
      const response = await api(...params)
      setData(response.data)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [api, setError, setLoading, setData])

  return {
    loading,
    error,
    unsetError,
    data,
    request,
  }
}

export default useApi
