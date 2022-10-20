interface ReplicatedStorage {
	Assets: Folder & {
		Map: Folder & {
			Path: Folder & {
				End: Part & {
					Attachment1: Attachment;
				};
				Start: Part & {
					Attachment0: Attachment;
					RodConstraint: RodConstraint;
				};
				Other: Part & {
					Attachment1: Attachment;
					Attachment0: Attachment;
					RodConstraint: RodConstraint;
				};
			};
			"Start Island BMP": Model & {
				"pad island": Model & {
					Sand: MeshPart;
					Grass: MeshPart;
				};
				pad: UnionOperation;
				"All house": Model & {
					"House in Project Bacon seas": Model & {
						"Wood Planks": Model & {
							Part: Part;
						};
						Roof: Model & {
							Part: Part;
						};
						Chimney: Model & {
							Part: Part;
						};
						"Roof Window": Model & {
							Model: Model & {
								Part: Part;
							};
							Union: UnionOperation;
						};
						"Door & Windows": Model & {
							Door: Model & {
								Part: Part;
							};
							Model: Model & {
								Model: Model & {
									"Window Frame": Model & {
										Part: Part;
									};
									Glass: Part;
								};
								"Interior Light": Part;
							};
						};
						Walls: Model & {
							Union: UnionOperation;
							Wedge: WedgePart;
						};
						ThumbnailCamera: Camera;
					};
				};
				SpawnLocation: SpawnLocation;
			};
			SpawnLocation: SpawnLocation & {
				Decal: Decal;
			};
		};
		guns: Folder & {
			"AK47 1st Class": Model & {
				gun_id: StringValue;
				NoCol: ModuleScript & {
					holster: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								Torso: Pose & {
									"grip.AK47 1st Class": Pose;
								};
							};
							KF1: Keyframe;
						};
					};
					idle: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.AK47 1st Class": Pose & {
											Bolt: Pose;
										};
									};
								};
							};
							KF1: Keyframe;
						};
					};
					reload: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.AK47 1st Class": Pose & {
											Bolt: Pose;
											Mag: Pose;
										};
									};
								};
							};
							"sfx/269079756": Keyframe & {
								Torso: Pose & {
									"grip.AK47 1st Class": Pose & {
										Mag: Pose;
									};
								};
							};
							"mag.out": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.AK47 1st Class": Pose & {
										Mag: Pose;
									};
								};
							};
							"mag.in": Keyframe & {
								Torso: Pose & {
									"Left Arm": Pose;
									"grip.AK47 1st Class": Pose & {
										Mag: Pose;
									};
								};
							};
							"sfx/268870088": Keyframe & {
								Torso: Pose & {
									"grip.AK47 1st Class": Pose;
								};
							};
							"sfx/269079412": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.AK47 1st Class": Pose;
								};
							};
							KF1: Keyframe;
							"sfx/393678915": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.AK47 1st Class": Pose;
								};
							};
							"sfx/393678959": Keyframe & {
								Torso: Pose & {
									"Left Arm": Pose;
								};
							};
							"KF2.5999999046326": Keyframe;
							"KF1.9999999046326": Keyframe;
							"KF1.9999998807907": Keyframe;
						};
					};
					equip: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.AK47 1st Class": Pose;
									};
								};
							};
							"KF0.85000002384186": Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.AK47 1st Class": Pose;
									};
								};
							};
						};
					};
				};
				A1: UnionOperation & {
					Weld: ManualWeld;
				};
				ButtPad: UnionOperation;
				ChargingHandleButton: UnionOperation & {
					Weld: ManualWeld;
				};
				FrontSight: UnionOperation & {
					Weld: ManualWeld;
				};
				GunDetail: UnionOperation & {
					Weld: ManualWeld;
				};
				GunHandle: UnionOperation & {
					Weld: ManualWeld;
				};
				GunRail: UnionOperation & {
					Weld: ManualWeld;
				};
				GunRings: UnionOperation & {
					Weld: ManualWeld;
				};
				HandGuard: UnionOperation & {
					Weld: ManualWeld;
				};
				Handle: UnionOperation & {
					Weld: ManualWeld;
				};
				Mag: MeshPart & {
					Weld: Weld;
				};
				MagRelease: UnionOperation & {
					Weld: ManualWeld;
				};
				Paint: UnionOperation & {
					Weld: ManualWeld;
				};
				RearSight: UnionOperation & {
					Weld: ManualWeld;
				};
				Receiver: UnionOperation & {
					Weld: ManualWeld;
				};
				Slide: UnionOperation & {
					Weld: ManualWeld;
				};
				Sling: UnionOperation & {
					Weld: ManualWeld;
				};
				Stock: UnionOperation & {
					Weld: ManualWeld;
				};
				TriggerGuard: UnionOperation & {
					Weld: ManualWeld;
				};
				"Bolt (Nail)": Part & {
					Mesh: SpecialMesh;
					Weld: ManualWeld;
				};
				"grip.AK47 1st Class": Part & {
					Handle: Attachment;
					Barrel: Attachment & {
						".05": PointLight;
						emit: ParticleEmitter;
					};
					FireSound: Sound;
					"Bolt (Nail)": WeldConstraint;
					ChargingHandleButton: WeldConstraint;
					FrontSight: WeldConstraint;
					TriggerGuard: WeldConstraint;
					GunRail: WeldConstraint;
					Paint: WeldConstraint;
					Slide: WeldConstraint;
					Receiver: WeldConstraint;
					RearSight: WeldConstraint;
					Stock: WeldConstraint;
					Mag: Motor6D;
					GunRings: WeldConstraint;
					Sling: WeldConstraint;
					HandGuard: WeldConstraint;
					GunDetail: WeldConstraint;
					A1: WeldConstraint;
					ButtPad: WeldConstraint;
					GunHandle: WeldConstraint;
					MagRelease: WeldConstraint;
					Weld: ManualWeld;
				};
			};
			"Barrett 50": Model & {
				gun_id: StringValue;
				NoCol: ModuleScript & {
					equip: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										Head: Pose;
										"grip.Barrett50": Pose & {
											Stock: Pose;
											Bullets: Pose;
											"Stripper Clip": Pose;
										};
									};
								};
							};
							"KF1.0980000495911": Keyframe;
						};
					};
					holster: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								Torso: Pose & {
									"grip.Barrett50": Pose & {
										Stock: Pose;
										Bullets: Pose;
										"Stripper Clip": Pose;
									};
								};
							};
							"KF2.8499999046326": Keyframe;
						};
					};
					idle: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.Barrett50": Pose & {
											Bullets: Pose;
											"Stripper Clip": Pose;
										};
									};
								};
							};
							"KF0.85": Keyframe;
							"KF0.85000002384186": Keyframe;
						};
					};
					reload: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.Barrett50": Pose & {
											Bullets: Pose;
											"Stripper Clip": Pose;
										};
									};
								};
							};
							"sfx/287233050": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"grip.Barrett50": Pose & {
										dd: Pose;
										Bullets: Pose;
										"Stripper Clip": Pose;
									};
								};
							};
							"sfx/287233078": Keyframe & {
								Torso: Pose & {
									"grip.Barrett50": Pose & {
										jj: Pose;
									};
								};
							};
							"clip.in": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"grip.Barrett50": Pose & {
										Bullets: Pose;
										"Stripper Clip": Pose;
									};
								};
							};
							"sfx/334570520": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"grip.Barrett50": Pose & {
										Bullets: Pose;
										"Stripper Clip": Pose;
									};
								};
							};
							"KF1.3990000486374": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.Barrett50": Pose & {
										Bullets: Pose;
									};
								};
							};
							"sfx/287233124": Keyframe & {
								Torso: Pose & {
									"grip.Barrett50": Pose & {
										jj: Pose;
										"Stripper Clip": Pose;
									};
								};
							};
							no: Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"grip.Barrett50": Pose & {
										jj: Pose;
										dd: Pose;
										"Stripper Clip": Pose;
									};
								};
							};
							"sfx/287233160": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"grip.Barrett50": Pose & {
										jj: Pose;
										dd: Pose;
									};
								};
							};
							"mag.in": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"grip.Barrett50": Pose & {
										dd: Pose;
									};
								};
							};
							"KF2.8489999771118": Keyframe;
						};
					};
				};
				Body: MeshPart & {
					Weld: ManualWeld;
				};
				Bolt: MeshPart;
				Mag: MeshPart & {
					Weld: ManualWeld;
				};
				Middle: UnionOperation & {
					Weld: ManualWeld;
				};
				Scope: UnionOperation & {
					Weld: ManualWeld;
				};
				Screws: UnionOperation & {
					Weld: ManualWeld;
				};
				Shell: UnionOperation & {
					Weld: ManualWeld;
				};
				BoltHinge: Part & {
					Weld: ManualWeld;
				};
				Chamber: Part & {
					Weld: ManualWeld;
				};
				"grip.Barrett50": Part & {
					Handle: Attachment;
					Barrel: Attachment & {
						".05": PointLight;
						emit: ParticleEmitter;
					};
					Weld: ManualWeld;
				};
			};
			"HK-P7": Model & {
				gun_id: StringValue;
				NoCol: ModuleScript & {
					equip: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"grip.HK-P7": Pose;
									};
								};
							};
						};
					};
					holster: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								Torso: Pose & {
									"grip.HK-P7": Pose;
								};
							};
							"KF4.5899999523163": Keyframe;
						};
					};
					idle: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.HK-P7": Pose;
									};
								};
							};
							"KF4.5899999523163": Keyframe;
						};
					};
					reload: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.HK-P7": Pose & {
											Mag: Pose;
										};
									};
								};
							};
							"sfx/268870109": Keyframe & {
								Torso: Pose & {
									"grip.HK-P7": Pose;
								};
							};
							"mag.out": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"grip.HK-P7": Pose & {
										Mag: Pose;
									};
								};
							};
							"mag.in": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.HK-P7": Pose & {
										Mag: Pose;
									};
								};
							};
							"sfx/265275744": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.HK-P7": Pose & {
										Mag: Pose;
									};
								};
							};
							"sfx/271098725": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.HK-P7": Pose;
								};
							};
							"sfx/393678946": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.HK-P7": Pose & {
										Bolt: Pose;
									};
								};
							};
						};
					};
				};
				Bolt: UnionOperation & {
					BoltForward: Sound;
					BoltBack: Sound;
					Weld: ManualWeld;
				};
				Mag: UnionOperation;
				Union: UnionOperation & {
					Weld: ManualWeld;
				};
				"grip.HK-P7": Part & {
					Handle: Attachment;
					Barrel: Attachment & {
						".05": PointLight;
						emit: ParticleEmitter;
					};
					Fire: Sound;
					Bolt: Motor6D;
					Mag: Motor6D;
					Union: WeldConstraint;
					Weld: ManualWeld;
				};
			};
			PPSH41: Model & {
				NoCol: ModuleScript & {
					equip: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.PPSH41": Pose;
									};
								};
							};
							"KF0.85000002384186": Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.PPSH41": Pose;
									};
								};
							};
						};
					};
					holster: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								Torso: Pose & {
									"grip.PPSH41": Pose;
								};
							};
							KF1: Keyframe;
						};
					};
					idle: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.PPSH41": Pose & {
											Bolt: Pose;
										};
									};
								};
							};
							KF1: Keyframe;
						};
					};
					reload: Animation & {
						KeyframeSequence: KeyframeSequence & {
							Keyframe: Keyframe & {
								HumanoidRootPart: Pose & {
									Torso: Pose & {
										"Right Arm": Pose;
										"Left Arm": Pose;
										Head: Pose;
										"grip.PPSH41": Pose & {
											Bolt: Pose;
											Mag: Pose;
										};
									};
								};
							};
							"sfx/269079756": Keyframe & {
								Torso: Pose & {
									"grip.PPSH41": Pose & {
										Mag: Pose;
									};
								};
							};
							"mag.out": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.PPSH41": Pose & {
										Mag: Pose;
									};
								};
							};
							"mag.in": Keyframe & {
								Torso: Pose & {
									"Left Arm": Pose;
									"grip.PPSH41": Pose & {
										Mag: Pose;
									};
								};
							};
							"sfx/268870088": Keyframe & {
								Torso: Pose & {
									"grip.PPSH41": Pose;
								};
							};
							"sfx/269079412": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.PPSH41": Pose;
								};
							};
							KF1: Keyframe;
							"sfx/393678915": Keyframe & {
								Torso: Pose & {
									"Right Arm": Pose;
									"Left Arm": Pose;
									"grip.PPSH41": Pose;
								};
							};
							"sfx/393678959": Keyframe & {
								Torso: Pose & {
									"Left Arm": Pose;
								};
							};
							"KF2.5999999046326": Keyframe;
							"KF1.9999999046326": Keyframe;
							"KF1.9999998807907": Keyframe;
						};
					};
				};
				AirBarrel: UnionOperation & {
					Weld: ManualWeld;
				};
				BeltClip: UnionOperation;
				Bolt: UnionOperation & {
					Weld: ManualWeld;
				};
				FireSwitchS: UnionOperation & {
					Weld: ManualWeld;
				};
				FrontSight: UnionOperation & {
					Weld: ManualWeld;
				};
				Housing1: UnionOperation & {
					Weld: ManualWeld;
				};
				Housing2: UnionOperation & {
					Weld: ManualWeld;
				};
				Housing3: UnionOperation & {
					Weld: ManualWeld;
				};
				Mag: UnionOperation & {
					Weld: ManualWeld;
				};
				MagazineCatchHinge: UnionOperation & {
					Weld: ManualWeld;
				};
				MagazineCatchOff: UnionOperation & {
					Weld: ManualWeld;
				};
				MetalStock: UnionOperation & {
					Weld: ManualWeld;
				};
				RearSights: UnionOperation & {
					Weld: ManualWeld;
				};
				Reciever: UnionOperation & {
					Weld: ManualWeld;
				};
				RecieverCasing: UnionOperation & {
					Weld: ManualWeld;
				};
				Shell: UnionOperation & {
					Weld: ManualWeld;
				};
				Stock: UnionOperation & {
					Weld: ManualWeld;
				};
				TriggerGuard: UnionOperation & {
					Weld: ManualWeld;
				};
				"grip.PPSH41": Part & {
					Handle: Attachment;
					Barrel: Attachment & {
						".05": PointLight;
						emit: ParticleEmitter;
					};
					Weld: ManualWeld;
					Motor6D: Motor6D;
					Fire: Sound;
				};
			};
		};
		models: Folder & {
			bomb: Model & {
				Handle: MeshPart;
			};
		};
		particles: Folder & {
			Blood: ParticleEmitter;
			Hit: ParticleEmitter;
		};
		units: Folder & {
			Hit: ParticleEmitter;
			"KPA Recruit": Model & {
				Head: Part & {
					Mesh: SpecialMesh;
					HairAttachment: Attachment;
					HatAttachment: Attachment;
					FaceFrontAttachment: Attachment;
					FaceCenterAttachment: Attachment;
					face: Decal;
				};
				Torso: Part & {
					roblox: Decal;
					NeckAttachment: Attachment;
					BodyFrontAttachment: Attachment;
					BodyBackAttachment: Attachment;
					LeftCollarAttachment: Attachment;
					RightCollarAttachment: Attachment;
					WaistFrontAttachment: Attachment;
					WaistCenterAttachment: Attachment;
					WaistBackAttachment: Attachment;
					"Right Shoulder": Motor6D;
					"Left Shoulder": Motor6D;
					"Right Hip": Motor6D;
					"Left Hip": Motor6D;
					Neck: Motor6D;
				};
				"Left Arm": Part & {
					LeftShoulderAttachment: Attachment;
					LeftGripAttachment: Attachment;
				};
				"Right Arm": Part & {
					RightShoulderAttachment: Attachment;
					RightGripAttachment: Attachment;
				};
				"Left Leg": Part & {
					LeftFootAttachment: Attachment;
				};
				"Right Leg": Part & {
					RightFootAttachment: Attachment;
				};
				Humanoid: Humanoid & {
					Animator: Animator;
					HumanoidDescription: HumanoidDescription;
				};
				HumanoidRootPart: Part & {
					RootAttachment: Attachment;
					RootJoint: Motor6D;
				};
				"Body Colors": BodyColors;
				Shirt: Shirt;
				Pants: Pants;
				Hat: Accessory & {
					Model: Model & {
						Middle: Part & {
							Mesh: SpecialMesh;
						};
						"SSH-40": MeshPart;
						Star: MeshPart;
						"Strap.": UnionOperation;
						Union: UnionOperation;
					};
					Handle: Part & {
						HatAttachment: Attachment;
						WeldConstraint: WeldConstraint;
						OriginalSize: Vector3Value;
						AccessoryWeld: Weld;
					};
				};
				Belt: Accessory & {
					Gear: Model & {
						Middle: Part & {
							Mesh: SpecialMesh;
						};
						D: UnionOperation;
						MeshPart: MeshPart;
						Union: UnionOperation;
						Wedge: WedgePart & {
							Mesh: SpecialMesh;
						};
						Part: Part & {
							Mesh: SpecialMesh;
						};
					};
					Handle: Part & {
						WaistCenterAttachment: Attachment;
						WeldConstraint: WeldConstraint;
						OriginalSize: Vector3Value;
						AccessoryWeld: Weld;
					};
				};
			};
			MoSS: Model & {
				Head: Part & {
					Mesh: SpecialMesh;
					HairAttachment: Attachment;
					HatAttachment: Attachment;
					FaceFrontAttachment: Attachment;
					FaceCenterAttachment: Attachment;
					face: Decal;
				};
				Torso: Part & {
					roblox: Decal;
					NeckAttachment: Attachment;
					BodyFrontAttachment: Attachment;
					BodyBackAttachment: Attachment;
					LeftCollarAttachment: Attachment;
					RightCollarAttachment: Attachment;
					WaistFrontAttachment: Attachment;
					WaistCenterAttachment: Attachment;
					WaistBackAttachment: Attachment;
					"Right Shoulder": Motor6D;
					"Left Shoulder": Motor6D;
					"Right Hip": Motor6D;
					"Left Hip": Motor6D;
					Neck: Motor6D;
				};
				"Left Arm": Part & {
					LeftShoulderAttachment: Attachment;
					LeftGripAttachment: Attachment;
				};
				"Right Arm": Part & {
					RightShoulderAttachment: Attachment;
					RightGripAttachment: Attachment;
				};
				"Left Leg": Part & {
					LeftFootAttachment: Attachment;
				};
				"Right Leg": Part & {
					RightFootAttachment: Attachment;
				};
				Humanoid: Humanoid & {
					Animator: Animator;
					HumanoidDescription: HumanoidDescription;
				};
				HumanoidRootPart: Part & {
					RootAttachment: Attachment;
					RootJoint: Motor6D;
				};
				"Body Colors": BodyColors;
				Shirt: Shirt;
				Pants: Pants;
				Hat: Accessory & {
					Handle: Part & {
						HatAttachment: Attachment;
						WeldConstraint: WeldConstraint;
						OriginalSize: Vector3Value;
						AccessoryWeld: Weld;
					};
					Model: Model & {
						Circle: MeshPart;
						MeshPart: MeshPart;
						Pin: MeshPart;
						"Red star": UnionOperation;
						Union: UnionOperation;
					};
				};
				Belt: Accessory & {
					Gear: Model & {
						Middle: Part & {
							Mesh: SpecialMesh;
						};
						D: UnionOperation;
						MeshPart: MeshPart;
						Union: UnionOperation;
						Wedge: WedgePart & {
							Mesh: SpecialMesh;
						};
						Part: Part & {
							Mesh: SpecialMesh;
						};
					};
					Handle: Part & {
						AccessoryWeld: Weld;
						WaistCenterAttachment: Attachment;
						WeldConstraint: WeldConstraint;
						OriginalSize: Vector3Value;
					};
				};
			};
			SGC: Model & {
				Head: Part & {
					Mesh: SpecialMesh;
					HairAttachment: Attachment;
					HatAttachment: Attachment;
					FaceFrontAttachment: Attachment;
					FaceCenterAttachment: Attachment;
					face: Decal;
				};
				Torso: Part & {
					roblox: Decal;
					NeckAttachment: Attachment;
					BodyFrontAttachment: Attachment;
					BodyBackAttachment: Attachment;
					LeftCollarAttachment: Attachment;
					RightCollarAttachment: Attachment;
					WaistFrontAttachment: Attachment;
					WaistCenterAttachment: Attachment;
					WaistBackAttachment: Attachment;
					"Right Shoulder": Motor6D;
					"Left Shoulder": Motor6D;
					"Right Hip": Motor6D;
					"Left Hip": Motor6D;
					Neck: Motor6D;
				};
				"Left Arm": Part & {
					LeftShoulderAttachment: Attachment;
					LeftGripAttachment: Attachment;
				};
				"Right Arm": Part & {
					RightShoulderAttachment: Attachment;
					RightGripAttachment: Attachment;
				};
				"Left Leg": Part & {
					LeftFootAttachment: Attachment;
				};
				"Right Leg": Part & {
					RightFootAttachment: Attachment;
				};
				Humanoid: Humanoid & {
					Animator: Animator;
					HumanoidDescription: HumanoidDescription;
				};
				HumanoidRootPart: Part & {
					RootAttachment: Attachment;
					RootJoint: Motor6D;
				};
				"Body Colors": BodyColors;
				Shirt: Shirt;
				Pants: Pants;
				Hat: Accessory & {
					Handle: Part & {
						HatAttachment: Attachment;
						WeldConstraint: WeldConstraint;
						OriginalSize: Vector3Value;
						AccessoryWeld: Weld;
					};
					Model: Model & {
						Union: UnionOperation;
						"Red star": UnionOperation;
						Circle: MeshPart;
						MeshPart: MeshPart;
						Pin: MeshPart;
					};
				};
				Belt: Accessory & {
					Gear: Model & {
						Middle: Part & {
							Mesh: SpecialMesh;
						};
						D: UnionOperation;
						MeshPart: MeshPart;
						Union: UnionOperation;
						Wedge: WedgePart & {
							Mesh: SpecialMesh;
						};
						Part: Part & {
							Mesh: SpecialMesh;
						};
					};
					Handle: Part & {
						WaistCenterAttachment: Attachment;
						WeldConstraint: WeldConstraint;
						OriginalSize: Vector3Value;
						AccessoryWeld: Weld;
					};
				};
			};
			SOF: Model & {
				Head: Part & {
					Mesh: SpecialMesh;
					HairAttachment: Attachment;
					HatAttachment: Attachment;
					FaceFrontAttachment: Attachment;
					FaceCenterAttachment: Attachment;
					face: Decal;
				};
				Torso: Part & {
					roblox: Decal;
					NeckAttachment: Attachment;
					BodyFrontAttachment: Attachment;
					BodyBackAttachment: Attachment;
					LeftCollarAttachment: Attachment;
					RightCollarAttachment: Attachment;
					WaistFrontAttachment: Attachment;
					WaistCenterAttachment: Attachment;
					WaistBackAttachment: Attachment;
					"Right Shoulder": Motor6D;
					"Left Shoulder": Motor6D;
					"Right Hip": Motor6D;
					"Left Hip": Motor6D;
					Neck: Motor6D;
				};
				"Left Arm": Part & {
					LeftShoulderAttachment: Attachment;
					LeftGripAttachment: Attachment;
				};
				"Right Arm": Part & {
					RightShoulderAttachment: Attachment;
					RightGripAttachment: Attachment;
				};
				"Left Leg": Part & {
					LeftFootAttachment: Attachment;
				};
				"Right Leg": Part & {
					RightFootAttachment: Attachment;
				};
				Humanoid: Humanoid & {
					Animator: Animator;
					HumanoidDescription: HumanoidDescription;
				};
				HumanoidRootPart: Part & {
					RootAttachment: Attachment;
					RootJoint: Motor6D;
				};
				"Body Colors": BodyColors;
				Shirt: Shirt;
				Pants: Pants;
				Hat: Accessory & {
					EarSet: MeshPart;
					Glass: MeshPart;
					Mask: MeshPart;
					MeshPart: MeshPart;
					Straps: MeshPart;
					balaclava: MeshPart;
					fasthelmet: MeshPart;
					Handle: Part & {
						HatAttachment: Attachment;
						WeldConstraint: WeldConstraint;
						OriginalSize: Vector3Value;
						AccessoryWeld: Weld;
					};
				};
				Belt: Accessory & {
					Belt: UnionOperation;
					FrontVelcro: UnionOperation;
					Gear: UnionOperation;
					L: UnionOperation;
					"L(2)": UnionOperation;
					"MOLLE(back)": UnionOperation;
					MagPouch1: UnionOperation;
					MagPouch2: UnionOperation;
					MagPouch3: UnionOperation;
					Plates: UnionOperation;
					R: UnionOperation;
					"R(1)": UnionOperation;
					Union: UnionOperation;
					"Utility (Velcro2)": UnionOperation;
					Waist: UnionOperation;
					Handle: Part & {
						WaistCenterAttachment: Attachment;
						WeldConstraint: WeldConstraint;
						OriginalSize: Vector3Value;
						AccessoryWeld: Weld;
					};
				};
			};
		};
		walkers: Folder & {
			Boss: Model & {
				HumanoidRootPart: Part & {
					"Root Hip": Motor6D;
				};
				Torso: Part & {
					"Left Hip": Motor6D;
					"Right Hip": Motor6D;
					"Left Shoulder": Motor6D;
					"Right Shoulder": Motor6D;
					Neck: Motor6D;
				};
				"Left Leg": Part;
				"Right Leg": Part;
				"Left Arm": Part;
				"Right Arm": Part;
				Head: Part & {
					Face: Decal;
					Mesh: SpecialMesh;
				};
				Humanoid: Humanoid;
				Animate: Script & {
					climb: StringValue & {
						ClimbAnim: Animation;
					};
					fall: StringValue & {
						FallAnim: Animation;
					};
					idle: StringValue & {
						Animation1: Animation & {
							Weight: NumberValue;
						};
						Animation2: Animation & {
							Weight: NumberValue;
						};
					};
					jump: StringValue & {
						JumpAnim: Animation;
					};
					run: StringValue & {
						RunAnim: Animation;
					};
					toolnone: StringValue & {
						ToolNoneAnim: Animation;
					};
					walk: StringValue & {
						WalkAnim: Animation;
					};
				};
				Pants: Pants;
				Shirt: Shirt;
			};
			Normal: Model & {
				HumanoidRootPart: Part & {
					"Root Hip": Motor6D;
				};
				Torso: Part & {
					"Left Hip": Motor6D;
					"Right Hip": Motor6D;
					"Left Shoulder": Motor6D;
					"Right Shoulder": Motor6D;
					Neck: Motor6D;
				};
				"Left Leg": Part;
				"Right Leg": Part;
				"Left Arm": Part;
				"Right Arm": Part;
				Head: Part & {
					Face: Decal;
					Mesh: SpecialMesh;
				};
				Humanoid: Humanoid;
				Animate: Script & {
					climb: StringValue & {
						ClimbAnim: Animation;
					};
					fall: StringValue & {
						FallAnim: Animation;
					};
					idle: StringValue & {
						Animation1: Animation & {
							Weight: NumberValue;
						};
						Animation2: Animation & {
							Weight: NumberValue;
						};
					};
					jump: StringValue & {
						JumpAnim: Animation;
					};
					run: StringValue & {
						RunAnim: Animation;
					};
					toolnone: StringValue & {
						ToolNoneAnim: Animation;
					};
					walk: StringValue & {
						WalkAnim: Animation;
					};
				};
				Pants: Pants;
				Shirt: Shirt;
			};
			Slow: Model & {
				HumanoidRootPart: Part & {
					"Root Hip": Motor6D;
				};
				Torso: Part & {
					"Left Hip": Motor6D;
					"Right Hip": Motor6D;
					"Left Shoulder": Motor6D;
					"Right Shoulder": Motor6D;
					Neck: Motor6D;
				};
				"Left Leg": Part;
				"Right Leg": Part;
				"Left Arm": Part;
				"Right Arm": Part;
				Head: Part & {
					Face: Decal;
					Mesh: SpecialMesh;
				};
				Humanoid: Humanoid;
				Animate: Script & {
					climb: StringValue & {
						ClimbAnim: Animation;
					};
					fall: StringValue & {
						FallAnim: Animation;
					};
					idle: StringValue & {
						Animation1: Animation & {
							Weight: NumberValue;
						};
						Animation2: Animation & {
							Weight: NumberValue;
						};
					};
					jump: StringValue & {
						JumpAnim: Animation;
					};
					run: StringValue & {
						RunAnim: Animation;
					};
					toolnone: StringValue & {
						ToolNoneAnim: Animation;
					};
					walk: StringValue & {
						WalkAnim: Animation;
					};
				};
				Pants: Pants;
				Shirt: Shirt;
				Handle: Part & {
					Mesh: SpecialMesh;
				};
			};
			Speedy: Model & {
				HumanoidRootPart: Part & {
					"Root Hip": Motor6D;
					BottomAttachment: Attachment;
					TopAttachment: Attachment;
					Trail: Trail;
				};
				Torso: Part & {
					"Left Hip": Motor6D;
					"Right Hip": Motor6D;
					"Left Shoulder": Motor6D;
					"Right Shoulder": Motor6D;
					Neck: Motor6D;
				};
				"Left Leg": Part;
				"Right Leg": Part;
				"Left Arm": Part;
				"Right Arm": Part;
				Head: Part & {
					Face: Decal;
					Mesh: SpecialMesh;
				};
				Humanoid: Humanoid;
				Animate: Script & {
					climb: StringValue & {
						ClimbAnim: Animation;
					};
					fall: StringValue & {
						FallAnim: Animation;
					};
					idle: StringValue & {
						Animation1: Animation & {
							Weight: NumberValue;
						};
						Animation2: Animation & {
							Weight: NumberValue;
						};
					};
					jump: StringValue & {
						JumpAnim: Animation;
					};
					run: StringValue & {
						RunAnim: Animation;
					};
					toolnone: StringValue & {
						ToolNoneAnim: Animation;
					};
					walk: StringValue & {
						WalkAnim: Animation;
					};
				};
				Pants: Pants;
				Shirt: Shirt;
			};
		};
	};
	Client: Folder & {
		main: LocalScript;
		receiveReplication: ModuleScript;
		receiveStore: ModuleScript;
		showGui: ModuleScript;
		store: Folder & {
			actions: Folder & {
				changeGameInfo: ModuleScript;
				changeSelectedUnit: ModuleScript;
				moneyChanged: ModuleScript;
				placementChanged: ModuleScript;
			};
			reducers: Folder & {
				gameInfoReducer: ModuleScript;
				moneyReducer: ModuleScript;
				placementReducer: ModuleScript;
				selectedUnit: ModuleScript;
			};
			store: ModuleScript;
		};
		systems: Folder & {
			gameInfoIsSentToStore: ModuleScript;
			placingUnitIsShown: ModuleScript;
			rangeIndicatorShowsRange: ModuleScript;
			showPlacementBounds: ModuleScript;
			specials: Folder & {
				sofClientSpecial: ModuleScript;
			};
			unitLooksAtTarget: ModuleScript;
			unitsCanBeSelected: ModuleScript;
			unitsHaveMeters: ModuleScript;
			walkerHealthIsShown: ModuleScript;
		};
		ui: Folder & {
			Main: ModuleScript;
			common: Folder & {
				ActionComponent: ModuleScript;
				BackgroundImage: ModuleScript;
				Badge: ModuleScript;
				Button: ModuleScript;
				Key: ModuleScript;
				Meter: ModuleScript;
				Padding: ModuleScript;
				Page: ModuleScript;
				PercentageBar: ModuleScript;
				Viewport: ModuleScript;
			};
			contexts: Folder & {
				MoneyContext: ModuleScript;
				PlacementContext: ModuleScript;
				WorldContext: ModuleScript;
			};
			defectors_crossed: Folder & {
				DefectorsCrossed: ModuleScript;
			};
			game: Folder & {
				UnitOverhead: ModuleScript;
				health: Folder & {
					WalkerHealth: ModuleScript;
					mountToPart: ModuleScript;
				};
				mountUnitOverheadToPart: ModuleScript;
			};
			game_over: Folder & {
				GameOver: ModuleScript;
				stories: Folder & {
					"GameOver.story": ModuleScript;
				};
			};
			hotbar: Folder & {
				Hotbar: ModuleScript;
				Slot: ModuleScript;
			};
			hud: Folder & {
				Hud: ModuleScript;
				HudButton: ModuleScript;
			};
			placement: Folder & {
				PlacementGui: ModuleScript;
			};
			stories: Folder & {
				"Main.story": ModuleScript;
			};
			unit_info: Folder & {
				UnitInfo: ModuleScript;
			};
			weapons: Folder & {
				Preview: ModuleScript;
				Slot: ModuleScript;
				Towers: ModuleScript;
				Weapons: ModuleScript;
				context: Folder & {
					SelectUnitContext: ModuleScript;
				};
			};
		};
	};
	Shared: Folder & {
		AnimationLoader: ModuleScript;
		bindComponent: ModuleScript;
		calculateRoundDifficulty: ModuleScript;
		canBePlaced: ModuleScript;
		clientState: ModuleScript;
		components: ModuleScript;
		enums: Folder & {
			focusPriority: ModuleScript;
		};
		games: Folder & {
			map1: ModuleScript;
		};
		getCoordsFromWorldSpace: ModuleScript;
		getHovered: ModuleScript;
		getWorldSpaceFromCoords: ModuleScript;
		gridSize: ModuleScript;
		guns: ModuleScript;
		modules: Folder & {
			audio: ModuleScript;
			calculateSellValue: ModuleScript;
			colors: ModuleScript;
			getLowestPositionFromModel: ModuleScript;
			getMouseTarget: ModuleScript;
			playTickSound: ModuleScript;
			ragdoll: ModuleScript;
		};
		moneySymbol: ModuleScript;
		remotes: ModuleScript;
		start: ModuleScript;
		store: Folder & {
			actions: Folder & {
				unitAdded: ModuleScript;
			};
			reducers: Folder & {
				unitReducer: ModuleScript;
			};
		};
		systems: Folder & {
			updateBoundComponents: ModuleScript;
			updateTransforms: ModuleScript;
		};
		units: ModuleScript;
		walkers: ModuleScript;
	};
	rbxts_include: Folder & {
		Promise: ModuleScript;
		RuntimeLib: ModuleScript;
	};
}

interface ServerScriptService {
	TS: Folder & {
		handleGame: ModuleScript;
		handlePlacements: ModuleScript;
		main: Script;
		money: ModuleScript;
		spawnWalker: ModuleScript;
		store: Folder & {
			actions: Folder & {
				setMoney: ModuleScript;
			};
			reducers: Folder & {
				playerMoneyReducer: ModuleScript;
			};
			store: ModuleScript;
		};
		systems: Folder & {
			animationHandlerPlaysAnimation: ModuleScript;
			characterBleedsWhenHit: ModuleScript;
			deathSystem: ModuleScript;
			gameOverHappens: ModuleScript;
			healthToHumanoidHealth: ModuleScript;
			invisibleUnitsAreHidden: ModuleScript;
			removeModels: ModuleScript;
			replication: ModuleScript;
			roundSystem: ModuleScript;
			specials: Folder & {
				mossHasSpecial: ModuleScript;
				sofHasSpecial: ModuleScript;
			};
			unitsDamageTarget: ModuleScript;
			unitsHaveGuns: ModuleScript;
			unitsHaveModels: ModuleScript;
			unitsHaveSpecials: ModuleScript;
			unitsTargetPrioritised: ModuleScript;
			walkerSystem: ModuleScript;
			walkersDie: ModuleScript;
		};
	};
}

interface Workspace {
	Map: Folder & {
		Path: Folder & {
			End: Part & {
				Attachment1: Attachment;
			};
			Start: Part & {
				Attachment0: Attachment;
				RodConstraint: RodConstraint;
			};
			Other: Part & {
				Attachment1: Attachment;
				Attachment0: Attachment;
				RodConstraint: RodConstraint;
			};
		};
		"Start Island BMP": Model & {
			"pad island": Model & {
				Sand: MeshPart;
				Grass: MeshPart;
			};
			pad: UnionOperation;
			"All house": Model & {
				"House in Project Bacon seas": Model & {
					"Wood Planks": Model & {
						Part: Part;
					};
					Roof: Model & {
						Part: Part;
					};
					Chimney: Model & {
						Part: Part;
					};
					"Roof Window": Model & {
						Model: Model & {
							Part: Part;
						};
						Union: UnionOperation;
					};
					"Door & Windows": Model & {
						Door: Model & {
							Part: Part;
						};
						Model: Model & {
							Model: Model & {
								"Window Frame": Model & {
									Part: Part;
								};
								Glass: Part;
							};
							"Interior Light": Part;
						};
					};
					Walls: Model & {
						Union: UnionOperation;
						Wedge: WedgePart;
					};
					ThumbnailCamera: Camera;
				};
			};
			SpawnLocation: SpawnLocation;
		};
		SpawnLocation: SpawnLocation & {
			Decal: Decal;
		};
	};
}
