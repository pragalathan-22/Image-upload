import React, { useState } from "react";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [scale, setScale] = useState(1); // For zoom functionality
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false); // Delete confirmation modal visibility
  const [imageToDeleteIndex, setImageToDeleteIndex] = useState(null); // Store the index of the image to delete

  // Handle image upload
  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  // Handle image deletion
  const handleImageDelete = (index) => {
    setImageToDeleteIndex(index); // Store the index of the image to delete
    setDeleteModalVisible(true); // Show the delete confirmation modal
  };

  // Confirm image deletion
  const confirmDelete = () => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== imageToDeleteIndex));
    setDeleteModalVisible(false); // Close the modal
    setImageToDeleteIndex(null); // Reset the image index
  };

  // Cancel image deletion
  const cancelDelete = () => {
    setDeleteModalVisible(false); // Close the modal
    setImageToDeleteIndex(null); // Reset the image index
  };

  // Handle opening the image modal
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setScale(1); // Reset zoom on open
  };

  // Handle closing the image modal
  const handleCloseModal = () => {
    setCurrentImageIndex(null);
  };

  // Handle next image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % images.length // Loop back to the first image
    );
    setScale(1); // Reset zoom
  };

  // Handle previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length // Loop back to the last image
    );
    setScale(1); // Reset zoom
  };

  // Handle zoom in
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3)); // Limit max zoom
  };

  // Handle zoom out
  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 1)); // Limit min zoom
  };

  return (
    <div className="gallery-container">
      <h1>Photos</h1>
      <label htmlFor="upload" className="upload-label">
        Upload Photos
      </label>
      <input
        type="file"
        id="upload"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="upload-input"
      />
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <button
              className="delete-button"
              onClick={() => handleImageDelete(index)} // Open delete confirmation modal
            >
              ✕
            </button>
            <img
              src={image}
              alt={`Uploaded ${index}`}
              className="gallery-image"
              onClick={() => handleImageClick(index)} // Open modal on click
            />
          </div>
        ))}
      </div>

      {currentImageIndex !== null && (
        <div className="modal">
          <span className="close" onClick={handleCloseModal}>
            ✕
          </span>
          <button className="prev-button" onClick={handlePrevImage}>
            ◀
          </button>
          <img
            src={images[currentImageIndex]}
            alt={`Zoomed ${currentImageIndex}`}
            className="modal-image"
            style={{ transform: `scale(${scale})` }} // Apply zoom
          />
          <div className="modal-controls">
            <button
              id="zoom-out"
              className="zoom-button zoom-out"
              onClick={handleZoomOut}
            >
              <i className="fa fa-search-minus"></i>
            </button>

            <button
              id="zoom-in"
              className="zoom-button zoom-in"
              onClick={handleZoomIn}
            >
              <i className="fa fa-search-plus"></i>
            </button>
          </div>
          <button className="next-button" onClick={handleNextImage}>
            ▶
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <p>Are you sure you want to delete this image?</p>
            <div className="button-container">
              <button onClick={confirmDelete} className="confirm-button">
                Yes
              </button>
              <button onClick={cancelDelete} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ImageGallery;
