export default function Switch(props){
    const {
        labelHidden,
        label = "",
        onChange,
        disabled,
        size = 'small',
        color = 'blue',
        checked,
        helperText=""
    } = props;

    const sizeClass = {smaller: 'min-w-7 w-7 h-4 after:h-3 after:w-3', small: 'min-w-9 w-9 h-5 after:h-4 after:w-4', medium: 'min-w-11 w-11 h-6 after:h-5 after:w-5', large: 'min-w-14 w-14 h-7 after:h-6 after:w-6'};
    const textClass = disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-300';

    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" checked={checked} disabled={disabled} onChange={(e) => {onChange(e.target.checked)}}/>
              <div className={`${sizeClass[size]} relative bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${color}-300 dark:peer-focus:ring-${color}-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-${color}-600`}></div>
              {label && !labelHidden && <span className={`ms-3 text-sm font-medium ${textClass}`}>{label}</span>}
            </label>
            {helperText && <span className="block text-gray-400">{helperText}</span>}
        </>
    )
}
