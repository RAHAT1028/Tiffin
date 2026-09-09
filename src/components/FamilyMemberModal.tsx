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
  AlertCircle,
  Smile
} from 'lucide-react';

interface FamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  activeMember?: FamilyMember | null;
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
  { id: 'boy1', label: 'Junior Boy', icon: '👦', url: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80' },
  { id: 'girl1', label: 'Junior Girl', icon: '👧', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
  { id: 'teen1', label: 'Teen Scholar', icon: '🧑', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: 'toddler1', label: 'Toddler', icon: '👶', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=300&q=80' },
  { id: 'mom1', label: 'Mom', icon: '👩', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
  { id: 'dad1', label: 'Dad', icon: '👨', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' }
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
  const [showAddForm, setShowAddForm] = useState(familyMembers.length === 0);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState<'Child' | 'Parent' | 'Spouse' | 'Self' | 'Sibling' | 'Other'>('Child');
  const [age, setAge] = useState<number>(7);
  const [location, setLocation] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState<Allergen[]>(['nuts']);
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0].url);
  const [defaultPlan, setDefaultPlan] = useState<MealCategory>('standard');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen && familyMembers.length === 0) {
      setShowAddForm(true);
    }
  }, [isOpen, familyMembers.length]);

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
      setErrorMsg('Please enter both name and school / delivery location.');
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
    setSelectedAllergens(['nuts']);
    setErrorMsg(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
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
                Manage your real children and family members with individual allergen passports & school drop lockers.
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

        {/* Current Family Members List / Grid */}
        {familyMembers.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#A8988A]">
                Your Registered Family Members ({familyMembers.length})
              </h4>
              {!showAddForm && (
                <button
                  onClick={() => {
                    sfx.playPop();
                    setShowAddForm(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shadow-orange-600/30 active:scale-95"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Add Child / Member</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {familyMembers.map((member) => {
                const isActive = activeMember?.id === member.id;
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

                      {onDeleteFamilyMember && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sfx.playPop();
                            onDeleteFamilyMember(member.id);
                          }}
                          className="p-1.5 rounded-lg text-[#8C7B6D] hover:text-rose-400 hover:bg-rose-950/50 border border-transparent hover:border-rose-500/30 transition-all mt-1"
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
        ) : (
          !showAddForm && (
            <div className="text-center py-10 px-4 bg-[#15100C] rounded-3xl border border-dashed border-orange-500/30 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-orange-950/80 border border-orange-500/30 text-orange-400 flex items-center justify-center mx-auto shadow-lg">
                <Users className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="text-base font-extrabold text-white">No Family Members Added Yet</h4>
                <p className="text-xs text-[#D4C5B5] mt-1 leading-relaxed">
                  Add your child's profile to create their personalised allergen passport, select their Dhaka school campus, and assign custom lunchboxes.
                </p>
              </div>
              <button
                onClick={() => {
                  sfx.playPop();
                  setShowAddForm(true);
                }}
                className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 inline-flex items-center gap-2 active:scale-95 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Add Your First Child or Family Member</span>
              </button>
            </div>
          )
        )}

        {/* ADD FAMILY MEMBER FORM */}
        {showAddForm && (
          <form onSubmit={handleCreateMember} className="p-5 bg-[#261E18] rounded-3xl border border-orange-500/30 space-y-4 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
              <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-orange-400" />
                <span>Add Real Child / Family Member</span>
              </h4>
              {familyMembers.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-[#A8988A] hover:text-white"
                >
                  Cancel
                </button>
              )}
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
                  placeholder="e.g. Aayan Rahman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 placeholder-[#7A6A5E]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1">Relationship / Role *</label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value as any)}
                  className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1">
                  {relation === 'Child' ? 'School Campus & Class / Locker *' : 'Delivery Address or Office Desk *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={relation === 'Child' ? 'e.g. Scholastica Senior Campus • Class 3B (Uttara)' : 'e.g. Gulshan Centre Point • Level 9, Dhaka'}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 placeholder-[#7A6A5E]"
                />
              </div>

              {relation === 'Child' && (
                <div>
                  <label className="text-xs font-bold text-[#A8988A] block mb-1">Child's Age (Years)</label>
                  <input
                    type="number"
                    min={3}
                    max={18}
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value, 10) || 7)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}
            </div>

            {/* Avatar Picker */}
            <div>
              <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Select Profile Avatar</label>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {PRESET_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => {
                      sfx.playPop();
                      setSelectedAvatar(av.url);
                    }}
                    className={`p-1.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 flex-shrink-0 ${
                      selectedAvatar === av.url ? 'border-orange-500 bg-orange-950/60 scale-105 shadow-md shadow-orange-600/30' : 'border-orange-500/20 bg-[#15100C] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={av.url} alt={av.label} className="w-10 h-10 rounded-xl object-cover" />
                    <span className="text-[10px] font-bold text-[#D4C5B5]">{av.icon} {av.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Allergen Checkboxes */}
            <div>
              <label className="text-xs font-bold text-[#A8988A] block mb-1.5">
                Allergen Passport (Strict Quarantine Filters)
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
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Save & Register {name ? name : 'Child Profile'}</span>
            </button>
          </form>
        )}

        {/* Modal Bottom Close */}
        <div className="pt-2 border-t border-orange-500/20 flex items-center justify-between text-xs text-[#A8988A]">
          <span>💡 Lunches will be individually labeled with child name & allergen tags.</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#261E18] hover:bg-[#322720] text-white font-bold text-xs border border-orange-500/30"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
