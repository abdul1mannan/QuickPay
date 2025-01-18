import PropTypes from 'prop-types';

export function InputBox({ label, placeholder, value, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-1">{label}</div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 border-2 border-slate-400 rounded-md p-1"
      />
    </div>
  );
}

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
