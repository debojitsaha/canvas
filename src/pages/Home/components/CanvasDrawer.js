import { data } from "../../../constants/data";

class CanvasDrawer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  draw() {
    this.ctx.save();

    this.ctx.fillStyle = '#0369A1';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.restore();
  }

  drawCaption(caption) {
    const { text, position, max_characters_per_line, font_size, alignment, text_color } = caption;
    this.ctx.save();

    this.ctx.fillStyle = text_color || '#000';
    this.ctx.strokeStyle = text_color || '#FFFFFF';
    this.ctx.font = `${font_size}px Arial`;

    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = this.ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > max_characters_per_line * (font_size / 2) && i > 0) {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }

    lines.push(line);

    let y = position.y
    for (let i = 0; i < lines.length; i++) {
      this.ctx.textAlign = alignment || 'left';
      this.ctx.fillText(lines[i], position.x, y);
      this.ctx.strokeText(lines[i], position.x, y);
      y += font_size;
    }

    this.ctx.restore();
  }

  drawCTA(cta) {
    const { text, position, font_size = 30, text_color, background_color, wrap_length = 20 } = cta;
    this.ctx.save();

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.fillStyle = background_color || '#000';
    this.ctx.strokeStyle = text_color || '#FFFFFF';

    const x = position.x;
    const y = position.y;

    // Measure text width and height
    const textMetrics = this.ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = font_size;

    // Calculate width and height of the rounded rect (CTA button)
    const rectWidth = textWidth + 7 * wrap_length;
    const rectHeight = textHeight + 3 * wrap_length;

    // Draw the rounded rect (CTA button)
    this.ctx.beginPath();
    this.ctx.moveTo(x - rectWidth / 2 + wrap_length, y - rectHeight / 2);
    this.ctx.arcTo(x + rectWidth / 2, y - rectHeight / 2, x + rectWidth / 2, y + rectHeight / 2, wrap_length);
    this.ctx.arcTo(x + rectWidth / 2, y + rectHeight / 2, x - rectWidth / 2, y + rectHeight / 2, wrap_length);
    this.ctx.arcTo(x - rectWidth / 2, y + rectHeight / 2, x - rectWidth / 2, y - rectHeight / 2, wrap_length);
    this.ctx.arcTo(x - rectWidth / 2, y - rectHeight / 2, x + rectWidth / 2 - wrap_length, y - rectHeight / 2, wrap_length);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = text_color || '#FFFFFF';
    this.ctx.font = `${font_size}px Arial`;
    this.ctx.fillText(text, x, y);
    this.ctx.strokeText(text, x, y);

    this.ctx.restore();
  }

  drawImageInRectangle(imageSrc, x, y, width, height) {
    const img = new Image();
    img.src = imageSrc;

    const templateData = data;

    img.onload = () => {
      this.ctx.save();

      this.ctx.drawImage(img, x, y, width, height);
      console.log('Rectangle Image drawn successfully'); // Log success

      this.ctx.restore();
      // this.drawCaption(templateData.caption);
      // this.drawCTA(templateData.cta);
    };

    img.onerror = (error) => {
      console.error('Error loading image:', error); // Log error
    };
  }

  drawImageInMask(imageSrc, x, y, width, height) {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      this.ctx.save();

      // Calculate the center of the mask area
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      // Draw the new image at the center of the mask area
      this.ctx.drawImage(img, centerX - width / (2), centerY - height / (2), width, height);

      console.log('Mask Image drawn successfully'); // Log success

      this.ctx.restore();
    };

    img.onerror = (error) => {
      console.error('Error loading image:', error); // Log error
    };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default CanvasDrawer;