import { AiOutlineCloseCircle } from 'react-icons/ai'

function TagsInput({ tagInputs, setTagInputs, user, noAuth }) {
  // console.log('tag input value', tagInputs)

  const addTags = (e) => {
    const lastChar = e.target.value.charAt(e.target.value.length - 1)
    if (lastChar === ' ') {
      const val = e.target.value.trim()
      if (val === ' ' || tagInputs.includes(val)) {
        e.target.value = ''
        return
      }
      setTagInputs((prev) => [...prev, val])
      e.target.value = ''
    }
  }

  const handleRemove = (tag) => {
    setTagInputs((prev) => prev.filter((val) => val !== tag))
  }

  return (
    <div className='w-full border-[1px] border-slate-400 flex items-center flex-wrap rounded-md p-2'>
      {tagInputs.length > 0 && (
        <div className='flex gap-2 flex-wrap'>
          {tagInputs.map((tag, index) => (
            <span
              key={index}
              className='bg-gray-400 rounded-lg min-w-[4rem] h-8 p-1 gap-x-1 text-white flex items-center justify-between'
            >
              {tag}
              <AiOutlineCloseCircle
                className='text-gray-800 cursor-pointer'
                onClick={() => handleRemove(tag)}
              />
            </span>
          ))}
        </div>
      )}
      {!noAuth ? (
        <input
          type='text'
          disabled={!user}
          onChange={addTags}
          placeholder='Tags (Space Separated)'
          className='w-full p-1 bg-transparent placeholder:text-gray-700 outline-none'
        />
      ) : (
        <input
          type='text'
          onChange={addTags}
          placeholder='Tags (Space Separated)'
          className='w-full p-1 bg-transparent placeholder:text-gray-700 outline-none'
        />
      )}
    </div>
  )
}

export default TagsInput
