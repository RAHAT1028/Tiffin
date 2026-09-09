import React, { useState } from 'react';
import { FamilyMember, Allergen, MealCategory } from '../types';
import { sfx } from '../utils/audio';
import { 
  X, 
  UserPlus, 
  Users, 
  School, 
  Building2, 
  ShieldAlert, 
  Check, 
  Trash2, 
  Sparkles, 
  Heart, 
  Edit2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface FamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  activeMember: FamilyMember;
  onSelectActiveMember: (member: FamilyMember) => void;
  onAddFamilyMember: (newMember: FamilyMember) => void;
  onDeleteFamilyMember?: (id: string) => void;
}

const ALL_ALLERGENS: { key: Allergen; label: string }[] = [
  { key: 'nuts', label: 'Peanuts / Tree Nuts' },
  { key: 'dairy', label: 'Dairy / Lactose' },
  { key: 'gluten', label: 'Gluten / Wheat' },
  { key: 'eggs', label: 'Eggs' },
  { key: 'soy', label: 'Soy' },
  { key: 'seafood', label: 'Seafood / Shellfish' },
  { key: 'sesame', label: 'Sesame' }
];

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80', // Boy
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', // Girl
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', // Mom
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', // Dad
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', // Teen
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'  // Boy 2
];

export const FamilyMemberModal: React.FC<FamilyMemberModalProps> = ({
  isOpen,
  onClose,
  familyMembers,
  activeMember,
  onSelectActiveMember,
  onAddFamilyMember,
  onDeleteFamilyMember
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState<'Child' | 'Parent' | 'Spouse' | 'Self' | 'Sibling' | 'Other'>('Child');
  const [age, setAge] = useState<number>(7);
  const [location, setLocation] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState<Allergen[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [defaultPlan, setDefaultPlan] = useState<MealCategory>('standard');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleAllergen = (alg: Allergen) => {
    sfx.playPop();
    if (selectedAllergens.includes(alg)) {
      setSelectedAllergens(selectedAllergens.filter((a) => a !== alg));
    } else {
      setSelectedAllergens([...selectedAllergens, alg]);
    }
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) {
      setErrorMsg('Please enter both name and delivery location/school.');
      sfx.playPop();
      return;
    }

    const newMember: FamilyMember = {
      id: `fam-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      relation: relation,
      age: relation === 'Child' ? age : undefined,
      deliveryLocation: location.trim(),
      allergies: selectedAllergens,
      dietaryPreferences: ['Fresh Hot Tiffin'],
      avatar: selectedAvatar,
      colorTheme: relation === 'Child' ? 'orange' : 'emerald',
      defaultPlan: defaultPlan
    };

    sfx.playSuccess();
    onAddFamilyMember(newMember);
    onSelectActiveMember(newMember);
    setShowAddForm(false);
    setName('');
    setLocation('');
    setSelectedAllergens([]);
    setErrorMsg(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#1C1712] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-500/30 text-[#F5EBE1] relative animate-in zoom-in-95 duration-200 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orange-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-600/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Family & Children Hub
              </h3>
              <p className="text-xs text-[#D4C5B5] mt-0.5">
                Manage separate lunchboxes, delivery drop points & allergen passports for each family member.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sfx.playPop();
              onClose();
            }}
            className="p-2.5 rounded-full bg-[#15100C] hover:bg-[#261E18] text-[#D4C5B5] hover:text-white border border-orange-500/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Family Members Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#A8988A]">
              Active Family Members ({familyMembers.length})
            </h4>
            {!showAddForm && (
              <button
                onClick={() => {
                  sfx.playPop();
                  setShowAddForm(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shadow-orange-600/30"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add Family Member</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {familyMembers.map((member) => {
              const isActive = activeMember.id === member.id;
              return (
                <div
                  key={member.id}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex items-start justify-between gap-3 ${
                    isActive
                      ? 'bg-[#261E18] border-orange-500 shadow-lg shadow-orange-950/60 ring-1 ring-orange-500/50'
                      : 'bg-[#15100C] border-orange-500/20 hover:border-orange-500/40 hover:bg-[#201813]'
                  }`}
                  onClick={() => {
                    sfx.playPop();
                    onSelectActiveMember(member);
                  }}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-11 h-11 rounded-2xl object-cover ring-2 ring-orange-500/40 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white truncate">
                          {member.name}
                        </span>
                        <span className="px-2 py-0.2 rounded-md bg-orange-950/80 text-orange-400 border border-orange-500/30 text-[10px] font-black uppercase">
                          {member.relation}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#A8988A] mt-1 flex items-center gap-1 truncate">
                        {member.relation === 'Child' ? (
                          <School className="w-3 h-3 text-orange-400 flex-shrink-0" />
                        ) : (
                          <Building2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        )}
                        <span className="truncate">{member.deliveryLocation}</span>
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {member.allergies.length > 0 ? (
                          member.allergies.map((alg) => (
                            <span key={alg} className="px-1.5 py-0.2 rounded bg-rose-950/80 border border-rose-600/40 text-rose-300 text-[9px] font-bold">
                              No {alg}
                            </span>
                          ))
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-[9px] font-bold">
                            No Allergies
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between self-stretch">
                    {isActive ? (
                      <span className="p-1 rounded-full bg-orange-600 text-white">
                        <Check className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="text-[10px] text-orange-400 font-bold hover:underline">
                        Select
                      </span>
                    )}

                    {familyMembers.length > 1 && onDeleteFamilyMember && !isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sfx.playPop();
                          onDeleteFamilyMember(member.id);
                        }}
                        className="p-1 rounded-lg text-[#8C7B6D] hover:text-rose-400 hover:bg-[#261E18] transition-colors"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ADD FAMILY MEMBER FORM */}
        {showAddForm && (
          <form onSubmit={handleCreateMember} className="p-5 bg-[#261E18] rounded-3xl border border-orange-500/30 space-y-4 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
              <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-orange-400" />
                <span>Add New Family Member / Child</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-[#A8988A] hover:text-white"
              >
                Cancel
              </button>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-950/80 border border-rose-600/60 rounded-xl text-rose-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1">Relationship / Role *</label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value as any)}
                  className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Child">Child (School / Nursery)</option>
                  <option value="Spouse">Spouse (Work / Office)</option>
                  <option value="Self">Self (Work / Office)</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Parent">Parent / Grandparent</option>
                  <option value="Other">Other Family Member</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#A8988A] block mb-1">
                {relation === 'Child' ? 'School Name & Classroom / Locker *' : 'Delivery Address or Office Desk *'}
              </label>
              <input
                type="text"
                required
                placeholder={relation === 'Child' ? 'e.g. Scholastica Senior Campus • Class 2A (Yellow Locker #8, Uttara)' : 'e.g. Gulshan Centre Point • Level 9, Road 90, Dhaka'}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Avatar Picker */}
            <div>
              <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Select Profile Avatar</label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {PRESET_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedAvatar === av ? 'border-orange-500 scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={av} alt="Avatar" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Allergen Checkboxes */}
            <div>
              <label className="text-xs font-bold text-[#A8988A] block mb-1.5">
                Allergen Passport (Quarantine Safeguards)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ALL_ALLERGENS.map((alg) => {
                  const isChecked = selectedAllergens.includes(alg.key);
                  return (
                    <button
                      key={alg.key}
                      type="button"
                      onClick={() => handleToggleAllergen(alg.key)}
                      className={`p-2 rounded-xl text-left text-xs font-bold border transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-rose-950/80 border-rose-500/60 text-rose-200'
                          : 'bg-[#15100C] border-orange-500/20 text-[#A8988A] hover:text-white'
                      }`}
                    >
                      <span className="text-[11px] truncate">{alg.label}</span>
                      {isChecked && <Check className="w-3 h-3 text-rose-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Save & Add {name ? name : 'Family Member'}</span>
            </button>
          </form>
        )}

        {/* Modal Bottom Close */}
        <div className="pt-2 border-t border-orange-500/20 flex items-center justify-between text-xs text-[#A8988A]">
          <span>💡 Food will be packaged in separately labeled thermal containers with recipient names.</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
