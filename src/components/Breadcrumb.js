import React from 'react';
// ...existing code...

function Breadcrumb(props) {
  // ...existing code...
  const { productName } = props;
  // ...existing code...
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {/* ...existing code... */}
        {productName && (
          <li className="breadcrumb-item active" aria-current="page">
            {productName}
          </li>
        )}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
