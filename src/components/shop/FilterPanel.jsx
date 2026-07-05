import { forwardRef } from "react";
import {
  BRANDS,
  SIZES,
  COLORS,
  SWATCH_HEX,
  PRICE_RANGES,
  AVAILABILITY,
  SORTS,
} from "../../data/shop.js";

function CheckOption({ label, checked, onChange, children }) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="check__box" aria-hidden="true" />
      {children ?? <span className="check__label">{label}</span>}
    </label>
  );
}

const FilterPanel = forwardRef(function FilterPanel(
  { id, open, onClose, filters, sort, onToggle, onPrice, onSort, onClear, activeCount },
  ref
) {
  return (
    <aside
      id={id}
      ref={ref}
      className={`filter-panel ${open ? "is-open" : ""}`}
      aria-label="Product filters"
    >
      <div className="filter-panel__head">
        <h2 className="filter-panel__title">Filters</h2>
        <button
          type="button"
          className="filter-panel__close"
          onClick={onClose}
          aria-label="Close filters"
        >
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <fieldset className="filter-group">
        <legend>Brand</legend>
        {BRANDS.map((b) => (
          <CheckOption
            key={b}
            label={b}
            checked={filters.brands.has(b)}
            onChange={() => onToggle("brands", b)}
          />
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Size (EU)</legend>
        <div className="filter-group__chips">
          {SIZES.map((s) => (
            <label className="chip" key={s}>
              <input
                type="checkbox"
                checked={filters.sizes.has(s)}
                onChange={() => onToggle("sizes", s)}
              />
              <span className="chip__face">{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Color</legend>
        {COLORS.map((c) => (
          <CheckOption
            key={c}
            checked={filters.colors.has(c)}
            onChange={() => onToggle("colors", c)}
          >
            <span className="check__label check__label--swatch">
              <span
                className="swatch"
                style={{ backgroundColor: SWATCH_HEX[c] }}
                aria-hidden="true"
              />
              {c}
            </span>
          </CheckOption>
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Price Range</legend>
        {PRICE_RANGES.map((r) => (
          <label className="check" key={r.id}>
            <input
              type="radio"
              name="price-range"
              checked={filters.price === r.id}
              onChange={() => onPrice(r.id)}
            />
            <span className="check__box check__box--round" aria-hidden="true" />
            <span className="check__label">{r.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Availability</legend>
        {AVAILABILITY.map((a) => (
          <CheckOption
            key={a.id}
            label={a.label}
            checked={filters.availability.has(a.id)}
            onChange={() => onToggle("availability", a.id)}
          />
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Sort By</legend>
        {SORTS.map((s) => (
          <label className="check" key={s.id}>
            <input
              type="radio"
              name="sort-by"
              checked={sort === s.id}
              onChange={() => onSort(s.id)}
            />
            <span className="check__box check__box--round" aria-hidden="true" />
            <span className="check__label">{s.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="filter-panel__actions">
        <button
          type="button"
          className="btn btn--ghost btn--small"
          onClick={onClear}
          disabled={activeCount === 0}
        >
          Clear all
        </button>
        <button
          type="button"
          className="btn btn--primary btn--small filter-panel__apply"
          onClick={onClose}
        >
          View results
        </button>
      </div>
    </aside>
  );
});

export default FilterPanel;
