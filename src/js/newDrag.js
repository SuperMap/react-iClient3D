import React, { useState, useCallback, useMemo, useEffect } from 'react';

const POSITION = { x: 0, y: 0 };

const Draggable = ({ children, id, onDrag, onDragEnd }) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION
  });

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState(state => ({
      ...state,
      isDragging: true,
      origin: { x: clientX - state.translation.x, y: clientY - state.translation.y }
    }));
  }, []);

  const handleMouseMove = useCallback(({ clientX, clientY }) => {
    const width = document.getElementById(id).offsetWidth;
    const height = document.getElementById(id).offsetHeight;
    const translation = { x: clientX - state.origin.x, y: clientY - state.origin.y };

    // 边界控制
    if (translation.x < 0) {
      translation.x = 0;
    }
    if (translation.y < 0) {
      translation.y = 0;
    }
    if (translation.x + width > window.innerWidth) {
      translation.x = window.innerWidth - width;
    }
    if (translation.y + height > window.innerHeight) {
      translation.y = window.innerHeight - height;
    }

    setState(state => ({
      ...state,
      translation
    }));

    onDrag({ translation, id });
  }, [state.origin, onDrag, id]);

  const handleMouseUp = useCallback(() => {
    setState(state => ({
      ...state,
      isDragging: false
    }));

    onDragEnd();
  }, [onDragEnd]);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(() => ({
    cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
    transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
    transition: state.isDragging ? 'none' : 'transform 500ms',
    zIndex: state.isDragging ? 2 : 1,
    position: state.isDragging ? 'absolute' : 'relative'
  }), [state.isDragging, state.translation]);

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default Draggable;