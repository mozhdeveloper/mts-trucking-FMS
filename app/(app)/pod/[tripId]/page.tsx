"use client";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Camera, X, RotateCcw, Save, MapPin, ChevronLeft, CheckCircle2, User, Phone, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { useTripStore, usePodStore } from "@/lib/store";
import { useAuthStore } from "@/lib/store/auth";
import { PageHeader } from "@/components/layout/PageHeader";
import { Logo } from "@/components/Brand/Logo";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SignatureCanvas: any = dynamic(() => import("react-signature-canvas"), { ssr: false });

export default function PodCapturePage() {
  const params   = useParams<{ tripId: string }>();
  const router   = useRouter();
  const user     = useAuthStore((s) => s.user);
  const trip     = useTripStore((s) => s.trips.find((t) => t.id === params.tripId));
  const setStatus = useTripStore((s) => s.setStatus);
  const addPod   = usePodStore((s) => s.addPod);

  const sigRef = useRef<any>(null);
  const [photos, setPhotos]                 = useState<string[]>([]);
  const [receiverName, setReceiverName]     = useState("");
  const [receiverContact, setReceiverContact] = useState("");
  const [notes, setNotes]                   = useState("");

  if (!trip) return <div className="text-center py-20 text-muted-foreground">Trip not found</div>;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => setPhotos((p) => [...p, reader.result as string]);
      reader.readAsDataURL(f);
    });
  };

  const removePhoto = (i: number) => setPhotos((p) => p.filter((_, idx) => idx !== i));
  const clearSig    = () => sigRef.current?.clear();

  const submit = () => {
    if (!receiverName)              { toast.error("Receiver name is required"); return; }
    if (sigRef.current?.isEmpty())  { toast.error("Signature is required"); return; }
    const signatureDataUrl = sigRef.current.toDataURL("image/png");
    addPod({
      tripId: trip.id,
      receiverName,
      receiverContact: receiverContact || undefined,
      signatureDataUrl,
      photoDataUrls: photos,
      notes: notes || undefined,
      gps: { lat: trip.dropoff.lat, lng: trip.dropoff.lng },
    });
    if (trip.status !== "completed") setStatus(trip.id, "completed", "driver", "POD captured");
    toast.success("Proof of delivery captured!");
    router.push(user?.role === "driver" ? "/pod" : `/trips/${trip.id}`);
  };

  // â”€â”€ Driver mobile view â”€â”€
  if (user?.role === "driver") {
    return (
      <div className="min-h-[100dvh] w-full flex flex-col bg-gray-50 overscroll-none">

        {/* Sticky header */}
        <header
          className="sticky top-0 z-30 bg-brand-black w-full shrink-0"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="max-w-lg mx-auto h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2"
              aria-label="Back"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="select-none">
              <Logo size={32} light showWordmark wordmarkSize="sm" />
            </div>
            <div className="min-w-[44px]" />
          </div>
          <div className="h-[2px] bg-brand-red" />
        </header>

        {/* Title banner */}
        <div
          className="bg-brand-black px-5 pb-5 pt-3 shrink-0"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(227,0,15,0.05) 0 1px, transparent 1px 12px)" }}
        >
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-red flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-black text-base font-display uppercase leading-tight">Capture POD</p>
              <p className="text-xs text-white/40 mt-0.5">{trip.id} &middot; {trip.dropoff.address.split(",")[0]}</p>
            </div>
          </div>
        </div>

        {/* Scrollable form */}
        <main className="flex-1 overflow-y-auto overscroll-contain">
          <div className="max-w-lg mx-auto px-4 pt-4 space-y-4 pb-28">

          {/* Receiver info */}
          <div className="bg-white border border-gray-100 shadow-sm p-4 space-y-4">
            <h3 className="font-black text-sm text-brand-black font-display uppercase tracking-wide">Receiver Information</h3>
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Receiver Name <span className="text-brand-red">*</span>
              </label>
              <input
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                placeholder="Juan Dela Cruz"
                className="w-full h-12 border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-gray-700 bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Contact <span className="text-gray-400">(optional)</span>
              </label>
              <input
                value={receiverContact}
                onChange={(e) => setReceiverContact(e.target.value)}
                placeholder="+63 917..."
                className="w-full h-12 border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-gray-700 bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Notes <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Condition of cargo, remarks..."
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-gray-700 resize-none bg-white"
              />
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white border border-gray-100 shadow-sm p-4">
            <h3 className="font-black text-sm text-brand-black font-display uppercase tracking-wide mb-3">Delivery Photos</h3>
            <label className="cursor-pointer block">
              <input type="file" multiple accept="image/*" capture="environment" className="hidden" onChange={handlePhotoUpload} />
              <div className="border-2 border-dashed border-gray-200 p-6 text-center hover:border-brand-red hover:bg-brand-red-light/20 transition-colors active:scale-[0.99]">
                <Camera className="w-8 h-8 text-brand-red mx-auto mb-2" />
                <p className="font-bold text-sm text-brand-black">Tap to take / upload photos</p>
                <p className="text-xs text-gray-400 mt-0.5">JPG, PNG &middot; Multiple allowed</p>
              </div>
            </label>
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {photos.map((p, i) => (
                  <div key={i} className="relative aspect-square">
                    <img src={p} alt={`Photo ${i + 1}`} className="w-full h-full object-cover border border-gray-100" />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-brand-red text-white flex items-center justify-center shadow"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
                <Camera className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                <p className="font-semibold text-sm text-[#0B1C2E]">Tap to take / upload photos</p>
                <p className="text-xs text-gray-400 mt-0.5">JPG, PNG Â· Multiple allowed</p>
              </div>
            </label>
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {photos.map((p, i) => (
                  <div key={i} className="relative aspect-square">
                    <img src={p} alt={`Photo ${i + 1}`} className="rounded-xl w-full h-full object-cover border border-gray-100" />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Signature */}
          <div className="bg-white border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-sm text-brand-black font-display uppercase tracking-wide">
                Receiver Signature <span className="text-brand-red">*</span>
              </h3>
              <button
                onClick={clearSig}
                className="flex items-center gap-1 text-xs text-gray-500 font-medium px-2.5 py-1.5 bg-gray-100 active:scale-95 transition-transform min-h-[36px]"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-200 overflow-hidden bg-white">
              <SignatureCanvas
                ref={sigRef}
                canvasProps={{ className: "w-full", style: { height: 180, width: "100%", display: "block" } }}
                penColor="#111111"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
              <MapPin className="w-3 h-3" />
              GPS: {trip.dropoff.lat.toFixed(4)}, {trip.dropoff.lng.toFixed(4)} &middot; Auto-timestamped
            </div>
          </div>
        </div>
        </main>

        {/* Sticky submit footer */}
        <div
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 px-4 pt-3"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}
        >
          <div className="max-w-lg mx-auto">
            <button
              onClick={submit}
              className="w-full h-14 bg-brand-red hover:bg-brand-red-dark active:scale-[0.98] text-white font-black text-sm font-display uppercase tracking-wide flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" /> Save Proof of Delivery
            </button>
          </div>
        </div>
      </div>
    );
  }

  // â”€â”€ Admin / dispatcher view (unchanged layout, responsive) â”€â”€
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Capture Proof of Delivery"
        subtitle={`Trip ${trip.id} Â· ${trip.dropoff.address}`}
        breadcrumbs={[{ label: "POD", href: "/pod" }, { label: trip.id }]}
      />

      <Card>
        <CardHeader><CardTitle>Receiver Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Receiver Name *</Label><Input value={receiverName} onChange={(e) => setReceiverName(e.target.value)} placeholder="Juan Dela Cruz" /></div>
            <div><Label>Contact (optional)</Label><Input value={receiverContact} onChange={(e) => setReceiverContact(e.target.value)} placeholder="+63 917..." /></div>
          </div>
          <div><Label>Notes</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Condition of cargo, remarks..." /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Photos</CardTitle></CardHeader>
        <CardContent>
          <label className="cursor-pointer">
            <input type="file" multiple accept="image/*" capture="environment" className="hidden" onChange={handlePhotoUpload} />
            <div className="border-2 border-dashed border-brand-border rounded-xl p-8 text-center hover:border-brand-teal hover:bg-brand-teal-light/30 transition">
              <Camera className="w-8 h-8 text-brand-teal mx-auto mb-2" />
              <div className="font-medium text-brand-navy">Tap to upload photos</div>
              <div className="text-xs text-muted-foreground">JPG, PNG Â· Multiple allowed</div>
            </div>
          </label>
          {photos.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4">
              {photos.map((p, i) => (
                <div key={i} className="relative group">
                  <img src={p} alt={`Photo ${i + 1}`} className="rounded-lg border border-brand-border w-full aspect-square object-cover" />
                  <button onClick={() => removePhoto(i)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Receiver Signature *</CardTitle>
          <Button size="sm" variant="ghost" onClick={clearSig}><RotateCcw className="w-3 h-3" /> Clear</Button>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-brand-border rounded-xl bg-white">
            <SignatureCanvas ref={sigRef} canvasProps={{ className: "w-full h-48 rounded-xl" }} penColor="#0B1220" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2"><MapPin className="w-3 h-3" /> GPS: {trip.dropoff.lat.toFixed(4)}, {trip.dropoff.lng.toFixed(4)} Â· Auto-timestamped</div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2 sticky bottom-4">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button onClick={submit} className="shadow-glow"><Save className="w-4 h-4" /> Save POD</Button>
      </div>
    </div>
  );
}
