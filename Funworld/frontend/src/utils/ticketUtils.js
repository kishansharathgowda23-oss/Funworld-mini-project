import QRCode from "qrcode";
import jsPDF from "jspdf";

export const generateQrDataUrl = async (booking) =>
  QRCode.toDataURL(
    JSON.stringify({
      bookingId: booking.bookingId,
      visitDate: booking.visitDate,
      total: booking.pricing.total,
    })
  );

export const downloadTicketPdf = async (booking) => {
  const qr = await generateQrDataUrl(booking);
  const pdf = new jsPDF();

  pdf.setFontSize(22);
  pdf.text("FunWorld Digital Pass", 20, 20);
  pdf.setFontSize(12);
  pdf.text(`Booking ID: ${booking.bookingId}`, 20, 35);
  pdf.text(`Visit Date: ${new Date(booking.visitDate).toLocaleDateString()}`, 20, 45);
  pdf.text(`Ticket Type: ${booking.ticketType}`, 20, 55);
  pdf.text(`Visitors: ${booking.adults} Adult / ${booking.children} Child`, 20, 65);
  pdf.text(`Total Paid: Rs. ${booking.pricing.total}`, 20, 75);
  pdf.text(`Status: ${booking.status}`, 20, 85);
  pdf.addImage(qr, "PNG", 140, 25, 45, 45);
  pdf.save(`${booking.bookingId}.pdf`);
};

