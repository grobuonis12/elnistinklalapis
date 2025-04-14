'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    if (debouncedValue) {
      window.location.href = `/search?q=${debouncedValue}`;
    }
  }, [debouncedValue])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
